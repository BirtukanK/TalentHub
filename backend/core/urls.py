from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views import (
RegisterView, LoginView,
JobListCreateView, JobDeleteView,
ApplicationCreateView, UserApplicationsView,
)


urlpatterns = [
path('auth/register', RegisterView.as_view()),
path('auth/login', LoginView.as_view()),
path('auth/refresh', TokenRefreshView.as_view()),


path('jobs', JobListCreateView.as_view()),
path('jobs/<int:pk>', JobDeleteView.as_view()),


path('applications', ApplicationCreateView.as_view()),
path('applications/<int:user_id>', UserApplicationsView.as_view()),
]