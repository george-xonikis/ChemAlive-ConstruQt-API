from django.contrib import admin

from .models import (UserProfile,
                     Project,
                     Collaboration)

admin.site.register(UserProfile)
admin.site.register(Project)
admin.site.register(Collaboration)
