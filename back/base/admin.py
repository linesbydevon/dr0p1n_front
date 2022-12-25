from django.contrib import admin
from .api.models import Spot, Skater, Comment, Obstacle

admin.site.register(Spot)
admin.site.register(Skater)
admin.site.register(Comment)
admin.site.register(Obstacle)