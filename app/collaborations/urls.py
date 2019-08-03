from django.urls import path
from .views import (CollaborationsView,
                    CollaborationRetrieveDestroyView,
                    UserCollaboratedInView,
                    SearchCollaborations)

urlpatterns = [
    path('', CollaborationsView.as_view(), name='collaborations-view'),
    path('user/', UserCollaboratedInView.as_view(), name='get-user-collaborated_in'),
    path('<int:pk>/', CollaborationRetrieveDestroyView.as_view(), name='get_update_delete-specific-collaboration'),

    # Search example: /api/collaborations/search/?search=<keyword>
    path('search/', SearchCollaborations.as_view(), name='collaboration-search'),
]

