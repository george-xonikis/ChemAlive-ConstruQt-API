from django.apps import AppConfig


class AppApiConfig(AppConfig):
    name = 'api'

    def ready(self):
        import api.signals
