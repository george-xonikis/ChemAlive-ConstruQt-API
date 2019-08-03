from rest_framework.response import Response
from rest_framework import filters
from rest_framework import generics, status
from rest_framework.generics import get_object_or_404
from django.contrib.auth import get_user_model

from rest_framework.views import APIView

from django.core.mail import EmailMessage
from django.template import loader

from api.models import Project, Collaboration
from .serializers import (CreateProjectSerializer,
                          UpdateProjectSerializer,
                          ViewProjectSerializer,
                          InvitationSerializer)
from collaborations.serializers import CreateCollaborationSerializer, ViewCollaborationSerializer

from api.models import UserProfile
User = get_user_model()


class ProjectsView(generics.ListAPIView):
    """
    Class to GET all Projects from all Users
    """
    queryset = Project.objects.all()
    serializer_class = ViewProjectSerializer


class UserProjectsView(generics.ListAPIView):
    """
    Class to GET all user's Projects and Collaborations
    """
    queryset = Project.objects.all()
    serializer_class = ViewProjectSerializer

    def get_queryset(self, *args, **kwargs):
        projects = Project.objects.filter(owner=self.request.user)
        return projects


class CreateProjectView(generics.CreateAPIView):
    """
    Class to POST a new Project
    """
    serializer_class = CreateProjectSerializer

    def post(self, request):
        serializer = CreateProjectSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save(owner=request.user, name=request.data['name'])
            return Response({"Status 201": "Project created successfully"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ProjectRetrieveUpdateDestroyView(APIView):
    """
    Class to GET / UPDATE / DESTROY a Project by id
    """

    def get_project(self, pk):
        project = get_object_or_404(Project, pk=pk)
        return project

    def get(self, request, pk):
        project = self.get_project(pk)
        serializer = ViewProjectSerializer(project)
        return Response(serializer.data)

    def put(self, request, pk):
        project = self.get_project(pk)
        serializer = UpdateProjectSerializer(project, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({"Status 201": "Project updated successfully"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        project = self.get_project(pk)
        project.delete()
        return Response({"Status 204": "Project deleted successfully"}, status=status.HTTP_204_NO_CONTENT)


class CreateCollaborationView(generics.ListCreateAPIView):
    """
    Class to GET all Project's Collaborators or POST a Collaboration.
    If the User is not registered, send an invitation email to register
    """
    serializer_class = ViewCollaborationSerializer

    def get_queryset(self):
        current_project_id = self.kwargs['pk']
        collaborations = Collaboration.objects.filter(project=current_project_id)
        return collaborations

    def post(self, request, *args, **kwargs):
        # Send email to already registered user
        project_id = kwargs['pk']
        # get the collaborator email from the POST request
        collaborator_email = request.data['collaborator']

        def send_email():
            template = loader.get_template('invite.html')
            subject = "ChemAlive ConstruQt API Collaboration"
            email_receiver = collaborator_email
            context = {'username': username,
                      'project_owner': request.user.email,
                       'project_name': Project.objects.get(id=project_id).name}
            template = template.render(context)
            message = EmailMessage(subject, template, to=[email_receiver])
            message.content_subtype = 'html'
            message.send()


        try:
            # try to check if there is a user with this email
            collaborator_id = User.objects.get(email=collaborator_email).id
            username = User.objects.get(email=collaborator_email).username
            send_email()

        except User.DoesNotExist:
            # if no user, send an invitation to register and temporary save the username and email
            serializer = InvitationSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save(serializer.initial_data)

            username = User.objects.get(email=request.data['collaborator']).username
            id = User.objects.get(email=collaborator_email).id
            code = UserProfile.objects.get(id=id).code

            template = loader.get_template('unregistered_invite.html')
            subject = "ChemAlive ConstruQt API Collaboration"
            email_receiver = collaborator_email
            context = {'username': username,
                      'project_owner': request.user.email,
                       'project_name': Project.objects.get(id=project_id).name,
                       'code': code}
            template = template.render(context)
            message2 = EmailMessage(subject, template, to=[email_receiver])
            message2.content_subtype = 'html'
            message2.send()

        finally:
            # get the user id of the temporary user
            collaborator_id = User.objects.get(email=collaborator_email).id

            # create a record to the Collaboration model using the collaborator_id and project_id
            request.data['collaborator'] = collaborator_id
            request.data['project'] = kwargs['pk']
            serializer = CreateCollaborationSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response({"Status 201": "Collaboration created succesfully"}, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class SearchProject(generics.ListAPIView):
    """
    Class to Search Projects
    """
    serializer_class = ViewProjectSerializer
    queryset = Project.objects.all()
    filter_backends = (filters.SearchFilter,)
    search_fields = ('name', 'owner__username', 'owner__first_name', 'owner__last_name',
                     'owner__user_profile__company')
