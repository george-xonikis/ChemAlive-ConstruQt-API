from rest_framework import serializers
from api.models import Collaboration
from users.serializers import UserSerializer


class ViewCollaborationSerializer(serializers.ModelSerializer):

    collaborator = UserSerializer()

    class Meta:
        model = Collaboration
        fields = ['id', 'project', 'collaborator']
        read_only_fields = ['id']


class CreateCollaborationSerializer(serializers.ModelSerializer):

    class Meta:
        model = Collaboration
        fields = ['project', 'collaborator']
