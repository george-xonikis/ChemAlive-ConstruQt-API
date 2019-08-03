from django.urls import path
from .views import (UserProfilesView,
                    LogedUserView,
                    LogedUserProfileView,
                    UserView,
                    ProfileView,
                    SearchUser)

urlpatterns = [
    path('', UserProfilesView.as_view(), name='user-profiles-view'),
    path('me/', LogedUserView.as_view(), name='get_update_destroy-current-user'),
    path('me/profile/', LogedUserProfileView.as_view(), name='update-current_user_profile'),
    path('<int:pk>/', UserView.as_view(), name='get-update-user'),
    path('<int:pk>/profile/', ProfileView.as_view(), name='get-update-user_profile'),

    # Search example: /api/users/search/?search=<keyword>
    path('search/', SearchUser.as_view(), name='user-search'),

]

