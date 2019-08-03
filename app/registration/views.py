from rest_framework.generics import GenericAPIView
from rest_framework.response import Response

from .serializers import (RegistrationSerializer,
                          RegistrationValidationSerializer)


class RegistrationView(GenericAPIView):
    serializer_class = RegistrationSerializer

    permission_classes = []
    authentication_classes = []

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(serializer.validated_data)
        return Response('Registration Successful')


class RegistrationValidationView(RegistrationView):
    serializer_class = RegistrationValidationSerializer

    permission_classes = []
    authentication_classes = []

