from rest_framework import serializers


class SubmitMessageSerializer(serializers.Serializer):

    name = serializers.CharField()
    email = serializers.EmailField()
    message = serializers.CharField()

    class Meta:
        fields = ['name', 'email', 'message']