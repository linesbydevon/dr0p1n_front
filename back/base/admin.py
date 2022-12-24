from django.contrib import admin
from .api.models import Spot, User, Comment, Obstacle

admin.site.register(Spot)
admin.site.register(User)
admin.site.register(Comment)
admin.site.register(Obstacle)