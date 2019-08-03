from rest_framework import serializers
from django.contrib.auth import get_user_model
from api.models import Project
from users.serializers import UserNestedSerializer

User = get_user_model()


class CreateProjectSerializer(serializers.ModelSerializer):

    class Meta:
        model = Project
        fields = ['name', 'owner', 'active', 'smile', 'created', 'updated']
        read_only_fields = ['id', 'owner', 'created', 'updated', 'active']


class UpdateProjectSerializer(serializers.ModelSerializer):

    class Meta:
        model = Project
        fields = ['name', 'smile']
        read_only_fields = ['id', 'created', 'updated', 'active']


class ViewProjectSerializer(serializers.ModelSerializer):

    collaborators = serializers.SerializerMethodField()
    owner = UserNestedSerializer()

    class Meta:
        model = Project
        fields = ['id', 'name', 'owner', 'active', 'smile', 'created', 'updated', 'collaborators']
        read_only_fields = ['id', 'created', 'updated']

    @staticmethod
    def get_collaborators(instance):
        num = len(instance.collaborations.all())  # total_collaborators
        keys = ['collaboration_id', 'user_id', 'username', 'email', 'company', 'first_name', 'last_name', 'premium']  # keys of json
        collaborators = []  # output list
        for i in range(0, num):
            values = []  # values of object
            collaboration_id = list(instance.collaborations.all())[i].id
            user_id = list(instance.collaborations.all())[i].collaborator.id
            username = list(instance.collaborations.all())[i].collaborator.username
            email = list(instance.collaborations.all())[i].collaborator.email
            company = list(instance.collaborations.all())[i].collaborator.user_profile.company
            first_name = list(instance.collaborations.all())[i].collaborator.first_name
            last_name = list(instance.collaborations.all())[i].collaborator.last_name
            premium = list(instance.collaborations.all())[i].collaborator.user_profile.premium

            values.extend([collaboration_id, user_id, username, email, company, first_name, last_name, premium])

            collaborators.append(dict(zip(keys, values)))

        return collaborators

    def to_representation(self, instance):
        data = super().to_representation(instance)
        return {
            **data,
            'collaborators_count': instance.collaborations.count(),
        }


class InvitationSerializer(serializers.Serializer):

    # @staticmethod
    # def send_registration_email(email, code):
    #     template = loader.get_template('unregistered_invite.html')
    #     subject = "Your ChemAlive Registration"
    #     context = {'code': code}
    #     template = template.render(context)
    #     message = EmailMessage(subject, template, to=[email])
    #     message.content_subtype = 'html'
    #
    #     message.send()

    def save(self, validated_data):
        email = validated_data.get('collaborator')
        new_user = User.objects.create_user(
            email=email,
            username=email,
            is_active=False,

        )
        #self.send_registration_email(email, new_user.user_profile.code)
        return new_user
