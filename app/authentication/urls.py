from django.urls import path

from .views import (PasswordResetView,
                    PasswordResetValidationView)

urlpatterns = [
    path('password-reset/', PasswordResetView.as_view(), name='password_reset'),
    path('password-reset/validate/', PasswordResetValidationView.as_view(), name='password_reset-validate'),
]