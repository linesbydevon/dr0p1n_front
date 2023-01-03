from django.shortcuts import render
from django.http import JsonResponse
from django.contrib.auth import get_user_model
from rest_framework import viewsets
from rest_framework import permissions
from rest_framework.generics import CreateAPIView
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from .models import Spot, Obstacle, Comment, Skater
from .serializers import UserSerializer, ObstacleSerializer, CommentSerializer, SpotSerializer, SkaterSerializer, AddCommentSerializer

class CreateUserView(CreateAPIView):

    model = get_user_model()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = UserSerializer

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        # ...

        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

class SpotView(viewsets.ModelViewSet):
    queryset = Spot.objects.all()
    serializer_class = SpotSerializer

class ObstacleView(viewsets.ModelViewSet):
    queryset = Obstacle.objects.all()
    serializer_class = ObstacleSerializer

class AddCommentView(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = AddCommentSerializer

class CommentView(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

class SkaterView(viewsets.ModelViewSet):
    queryset = Skater.objects.all()
    serializer_class = SkaterSerializer



@api_view(['GET'])
def getRoutes(request):
  routes = [
    '/api/token',
    '/api/token/refresh'
  ]
  return Response(routes)