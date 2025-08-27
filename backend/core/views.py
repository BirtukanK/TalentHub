from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import Job, Application
from .serializers import RegisterSerializer, JobSerializer, ApplicationSerializer
from .permissions import IsEmployer


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['role'] = user.role
        token['name'] = user.name
        return token


class LoginView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]


class JobListCreateView(generics.ListCreateAPIView):
    queryset = Job.objects.select_related('created_by').all().order_by('-created_at')
    serializer_class = JobSerializer


    def get_permissions(self):
        if self.request.method == 'POST':
            return [permissions.IsAuthenticated(), IsEmployer()]
        return [permissions.AllowAny()]


    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)


class JobDeleteView(generics.DestroyAPIView):
    queryset = Job.objects.all()
    serializer_class = JobSerializer


    def get_permissions(self):
        return [permissions.IsAuthenticated(), IsEmployer()]


    def perform_destroy(self, instance):
        # Only the creator can delete
        if instance.created_by != self.request.user:
            from rest_framework.exceptions import PermissionDenied
            raise PermissionDenied("Only the creator can delete this job.")
        return super().perform_destroy(instance)


class ApplicationCreateView(generics.CreateAPIView):
    serializer_class = ApplicationSerializer

    def get_queryset(self):
        return Application.objects.select_related('job','user')


    def create(self, request, *args, **kwargs):
        job_id = request.data.get('job_id')
        if Application.objects.filter(job_id=job_id, user=request.user).exists():
            return Response({'detail':'You already applied to this job.'}, status=status.HTTP_400_BAD_REQUEST)
        return super().create(request, *args, **kwargs)


class UserApplicationsView(generics.ListAPIView):
    serializer_class = ApplicationSerializer
    def get_queryset(self):
        user_id = self.kwargs['user_id']
        return Application.objects.select_related('job','user').filter(user_id=user_id).order_by('-created_at')