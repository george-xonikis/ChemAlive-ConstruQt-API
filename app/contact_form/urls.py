from django.urls import path
from .views import SubmitMessage

urlpatterns = [
    path('message', SubmitMessage.as_view(), name='submit-contact-form'),

]

