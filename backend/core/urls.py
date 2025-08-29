from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import (
RegisterView, LoginView, LogoutView,
JobListCreateView, JobDeleteView,
ApplicationCreateView, UserApplicationsView,
)


urlpatterns = [
    path("auth/register/", RegisterView.as_view(), name="register"),
    path("login/", LoginView.as_view(), name="login"),
    path("logout/", LogoutView.as_view(), name="logout"),
    path("auth/refresh/", TokenRefreshView.as_view(), name="token_refresh"),


    path('jobs/', JobListCreateView.as_view()),
    path('jobs/<int:pk>', JobDeleteView.as_view()),


    path('applications', ApplicationCreateView.as_view()),
    path('applications/<int:user_id>', UserApplicationsView.as_view()),
]