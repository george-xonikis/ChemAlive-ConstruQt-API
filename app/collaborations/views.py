from rest_framework.response import Response
from rest_framework import filters
from rest_framework import generics, status
from rest_framework.generics import get_object_or_404

from api.models import Collaboration
from rest_framework.views import APIView

from .serializers import (ViewCollaborationSerializer,
                          CreateCollaborationSerializer)


class CollaborationsView(generics.ListAPIView):
    """
    Class to GET all Collaborations
    """
    queryset = Collaboration.objects.all()
    serializer_class = ViewCollaborationSerializer


class UserCollaboratedInView(generics.ListAPIView):
    """
    Class to GET all User's Collaborations as guest
    """
    queryset = Collaboration.objects.all()
    serializer_class = ViewCollaborationSerializer

    def get_queryset(self, *args, **kwargs):
        collaborated_in = Collaboration.objects.filter(collaborator=self.request.user)
        return collaborated_in


class CollaborationRetrieveDestroyView(APIView):
    """
    Class to GET / DESTROY a Collaborations by id
    """

    def get_collaboration(self, pk):
        collaboration = get_object_or_404(Collaboration, pk=pk)
        return collaboration

    def get(self, request, pk):
        collaboration = self.get_collaboration(pk)
        serializer = CreateCollaborationSerializer(collaboration)
        return Response(serializer.data)

    def delete(self, request, pk):
        collaboration = self.get_collaboration(pk)
        collaboration.delete()
        return Response({"Status 204": "Collaboration deleted successfully"}, status=status.HTTP_204_NO_CONTENT)


class SearchCollaborations(generics.ListAPIView):
    """
    Class to Search Collaborations
    """
    serializer_class = ViewCollaborationSerializer
    queryset = Collaboration.objects.all()
    filter_backends = (filters.SearchFilter,)
    search_fields = ('collaborator__email', )
