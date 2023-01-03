from django.urls import path,include
from . import views
from .views import MyTokenObtainPairView, CreateUserView, SpotView, ObstacleView, CommentView, SkaterView, AddCommentView
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)
from rest_framework import routers

route = routers.DefaultRouter()
route.register("spots",SpotView, basename='spotsview')
route.register("comments",CommentView,basename='commentsview')
route.register("addcomments",AddCommentView,basename='addcommentsview')
route.register("obstacles",ObstacleView,basename='obstaclesview')
route.register("skaters",SkaterView,basename='skatersview')

urlpatterns = [
  path('', include(route.urls)),
  path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
  path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
  path("signup/", CreateUserView.as_view(), name="create_user"),

]