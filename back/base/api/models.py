from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Spot(models.Model):
  image = models.ImageField(upload_to='uploads/images/', null=True, blank=True)
  name = models.CharField(max_length=150, null=False, blank=False)
  lng = models.DecimalField(max_digits = 10,decimal_places=7, null=False, blank=False, default= 0.00)
  lat = models.DecimalField(max_digits = 10,decimal_places=7, null=False, blank=False, default= 0.00)
  address = models.CharField(max_length=250, null=True, blank=True)
  sactioned = models.BooleanField(default=False, null=True)
  security = models.BooleanField(default=False, null=True)

  
  def __str__(self):
      return self.name

class Skater(models.Model):
  image = models.ImageField(upload_to='uploads/images/', null=True, blank=True)
  user = models.OneToOneField(User, on_delete=models.CASCADE, null=True)
  dropin = models.ForeignKey(Spot, on_delete=models.SET_NULL, related_name='dropins', null=True, blank=True)

  def __str__(self):
    return f'{self.user}' 

class Comment(models.Model):
  image = models.ImageField(upload_to='uploads/images/', null=True, blank=True)
  spot = models.ForeignKey(Spot, on_delete=models.CASCADE, related_name='spotcomments')
  user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='usercomments')
  content = models.TextField(null=True, blank=True)
  
  def __str__(self):
      return self.content

class Obstacle(models.Model):
  name = models.CharField(max_length=256, blank=False, null=False)
  spot = models.ForeignKey(Spot, on_delete=models.CASCADE, related_name='obstacles')
  
  def __str__(self):
      return self.name