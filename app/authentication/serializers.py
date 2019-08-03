from django.contrib.auth import get_user_model
from django.core.mail import EmailMessage
from rest_framework import serializers

User = get_user_model()


class PasswordResetSerializer(serializers.Serializer):
    email = serializers.EmailField(
        label='Registration E-Mail Address'
    )

    def validate_email(self, email):
        try:
            return User.objects.get(email=email)
        except User.DoesNotExist:
            raise serializers.ValidationError('User does not exist!')

    @staticmethod
    def send_password_reset_email(email, code):
        message = EmailMessage(
            subject='ChemAlive password reset',
            body=f'This is your password reset code: \t  {code}',
            to=[email],
        )
        message.send()


class PasswordResetValidationSerializer(PasswordResetSerializer):
    code = serializers.CharField(
        label='Validation code',
        write_only=True,
    )
    password = serializers.CharField(
        label='password',
        write_only=True,
    )
    password_repeat = serializers.CharField(
        label='password',
        write_only=True,
    )

    def validate(self, data):
        user = data.get('email')
        if data.get('password') != data.get('password_repeat'):
            raise serializers.ValidationError({
                'password_repeat': 'Passwords do not match!'
            })
        if data.get('code') != user.user_profile.code:
            raise serializers.ValidationError({
                'code': 'Wrong validation code!'
            })
        return data

    def save(self, validated_data):
        user = validated_data.get('email')
        user.set_password(validated_data.get('password'))
        user.save()
        user.user_profile.code = ''
        user.user_profile.save()
        return user
