from rest_framework.response import Response
from rest_framework import generics, status
from django.core.mail import EmailMessage
from django.template import loader
from .serializers import SubmitMessageSerializer


class SubmitMessage(generics.CreateAPIView):
    """
    Class to POST a message from contact form
    """

    serializer_class = SubmitMessageSerializer

    def post(self, request):
        name = request.data['name']
        email = request.data['email']
        message = request.data['message']

        # Send email to chemalive account
        template = loader.get_template('message.html')
        subject = 'Message from Contact Form'
        email_receiver = 'students@propulsionacademy.com'
        context = {'name': name,
                   'email': email,
                   'message': message}
        template = template.render(context)
        message = EmailMessage(subject, template, to=[email_receiver])
        message.content_subtype = 'html'
        message.send()
        return Response({"Status 201": "Message Sent successfully"}, status=status.HTTP_201_CREATED)





