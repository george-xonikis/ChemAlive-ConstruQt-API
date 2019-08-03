from django.contrib.auth import get_user_model
from django.db import models
from api.helpers import generate_code

User = get_user_model()


class UserProfile(models.Model):
    user = models.OneToOneField(
        verbose_name='user',
        to=User,
        on_delete=models.CASCADE,
        related_name='user_profile'
    )
    company = models.CharField(null=True, blank=True, max_length=30)
    phone = models.CharField(null=True, blank=True, max_length=30)
    profile_pic = models.ImageField(null=True, blank=True)
    premium = models.BooleanField(default=False)
    code = models.CharField(
        verbose_name='code',
        max_length=255,
        default=generate_code,
    )

    def generate_new_code(self):
        self.code = generate_code()
        self.save()
        return self.code

    def __str__(self):
        return self.user.username


class Project(models.Model):

    name = models.CharField(blank=False, null=False, max_length=30)
    owner = models.ForeignKey(
        to=User,
        verbose_name='owner',
        on_delete=models.CASCADE,
        related_name='project_owner'
    )
    active = models.BooleanField(default=True)
    smile = models.CharField(max_length=500, blank=True, null=True)
    created = models.DateTimeField(auto_now=True)
    updated = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class Collaboration(models.Model):
    class Meta:
        unique_together = (('project', 'collaborator'),)

    project = models.ForeignKey(
        to=Project,
        verbose_name='project',
        on_delete=models.CASCADE,
        related_name='collaborations'
    )
    collaborator = models.ForeignKey(
        to=User,
        verbose_name='collaborator',
        on_delete=models.CASCADE,
        related_name='project_collaborator'
    )

    def __str__(self):
        return f"{str(self.collaborator).upper()} added as collaborator to {str(self.project).upper()}" \
            f" owned by {str(self.project.owner).upper()}"

