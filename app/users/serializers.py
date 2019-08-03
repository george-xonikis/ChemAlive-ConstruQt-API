from rest_framework import serializers
from api.models import UserProfile
from django.contrib.auth import get_user_model

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'first_name', 'last_name', 'email', 'date_joined']
        read_only_fields = ['id', 'date_joined']

        extra_kwargs = {
            'password': {'write_only': True}
        }


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['id', 'company', 'phone', 'profile_pic', 'premium']
        read_only_fields = ['id']


class UserNestedSerializer(serializers.ModelSerializer):

    user_profile = UserProfileSerializer()

    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'email', 'date_joined', 'user_profile']
        read_only_fields = ['id', 'date_joined']

        extra_kwargs = {
            'password': {'write_only': True}
        }

    # def update(self, instance, validated_data):
    #     # data = validated_data
    #     # instance.first_name = data['first_name']
    #     # instance.last_name = data['last_name']
    #     # instance.email = data['email']
    #     # instance.user_profile.company = data['user_profile']['company']
    #     # instance.user_profile.phone = data['user_profile']['phone']
    #     # instance.user_profile.profile_pic = data['user_profile']['profile_pic']
    #     # instance.save()
    #     #
    #     # return instance













