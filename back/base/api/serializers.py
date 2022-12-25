from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Skater, Spot, Obstacle, Comment



User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data["username"],
            password=validated_data["password"],
        )
        return user

    class Meta:
        model = User
        fields = ("id", "username", "password")

class ObstacleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Obstacle
        fields = '__all__'

class SpotSerializer(serializers.ModelSerializer):
    class Meta:
        model = Spot
        fields = '__all__'

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'

class SkaterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skater
        fields = '__all__'


