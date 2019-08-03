from django.urls import path
from .views import (ProjectsView,
                    UserProjectsView,
                    CreateProjectView,
                    ProjectRetrieveUpdateDestroyView,
                    CreateCollaborationView,
                    SearchProject)

urlpatterns = [
    path('', ProjectsView.as_view(), name='get_create-projects-view-'),
    path('user/', UserProjectsView.as_view(), name='get_user-projects-view-'),
    path('create/', CreateProjectView.as_view(), name='create-projects-view-'),
    path('<int:pk>/', ProjectRetrieveUpdateDestroyView.as_view(), name='get_update_delete-specific-project'),
    path('<int:pk>/collaboration/', CreateCollaborationView.as_view(), name='collaboration_create-view'),

    # Search example: /api/projects/search/?search=<keyword>
    path('search/', SearchProject.as_view(), name='project-search'),

]

