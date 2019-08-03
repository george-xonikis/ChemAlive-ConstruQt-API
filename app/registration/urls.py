from django.urls import path
from .views import (RegistrationView,
                    RegistrationValidationView)

urlpatterns = [
    path('', RegistrationView.as_view(), name='registration'),
    path('validation/', RegistrationValidationView.as_view(), name='validate-registration'),

]