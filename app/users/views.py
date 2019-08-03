from rest_framework.response import Response
from rest_framework import filters
from rest_framework import generics, status

from django.contrib.auth import get_user_model
from rest_framework.generics import get_object_or_404

from users.serializers import (UserSerializer,
                               UserProfileSerializer,
                               UserNestedSerializer)
from api.models import UserProfile
User = get_user_model()


class UserProfilesView(generics.ListAPIView):
    """
    Class to GET all User Profiles
    """
    queryset = User.objects.all()
    serializer_class = UserNestedSerializer


class LogedUserView(generics.RetrieveUpdateDestroyAPIView):
    """
    Class to GET / UPDATE / DESTROY the Loged in User
    """

    serializer_class = UserNestedSerializer
    queryset = User.objects.all()

    def get_queryset(self):
        self.kwargs['pk'] = self.request.user.id

        return self.queryset

    @staticmethod
    def get_user(self):
        user = get_object_or_404(User, pk=self.request.user.id)
        return user

    def put(self, request):
        user = self.get_user(self)
        serializer = UserSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({"Status 201": "User updated successfully"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request):
        user = self.get_user(self)
        user.delete()
        return Response({"Status 204": "User deleted successfully"}, status=status.HTTP_204_NO_CONTENT)


class LogedUserProfileView(generics.RetrieveUpdateAPIView):
    """
    Class to GET / UPDATE the Loged in User Profile
    """
    serializer_class = UserNestedSerializer
    queryset = User.objects.all()

    def get_queryset(self):
        self.kwargs['pk'] = self.request.user.id

        return self.queryset

    @staticmethod
    def get_user_profile(self):
        user_profile = get_object_or_404(UserProfile, pk=self.request.user.id)
        return user_profile

    def put(self, request):
        user_profile = self.get_user_profile(self)
        serializer = UserProfileSerializer(user_profile, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({"Status 201": "User Profile updated successfully"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserView(generics.RetrieveUpdateDestroyAPIView):
    """
    Class to GET / PUT / DESTROY a User using the user_id
    """
    serializer_class = UserSerializer

    @staticmethod
    def get_user_profile(pk):
        user_profile = get_object_or_404(User, pk=pk)
        return user_profile

    def get(self, request, pk):
        user_profile = self.get_user_profile(pk)
        serializer = UserSerializer(user_profile)
        return Response(serializer.data)

    def put(self, request, pk):
        user_profile = self.get_user_profile(pk)
        serializer = UserSerializer(user_profile, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({"Status 201": "User updated successfully"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        user_profile = self.get_user_profile(pk)
        user_profile.delete()
        return Response({"Status 204": "User deleted successfully"}, status=status.HTTP_204_NO_CONTENT)


class ProfileView(generics.RetrieveUpdateAPIView):
    """
    Class to GET / PUT / DESTROY a User using the user_id
    """
    serializer_class = UserProfileSerializer

    @staticmethod
    def get_user_profile(pk):
        user_profile = get_object_or_404(UserProfile, pk=pk)
        return user_profile

    def get(self, request, pk):
        user_profile = self.get_user_profile(pk)
        serializer = UserProfileSerializer(user_profile)
        return Response(serializer.data)

    def put(self, request, pk):
        user_profile = self.get_user_profile(pk)
        serializer = UserProfileSerializer(user_profile, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({"Status 201": "User Profile updated successfully"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class SearchUser(generics.ListAPIView):
    """
    Class to Search User Profiles
    """

    serializer_class = UserNestedSerializer
    queryset = User.objects.all()
    filter_backends = (filters.SearchFilter,)
    search_fields = ('username',)
