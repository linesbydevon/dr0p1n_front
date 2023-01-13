# Generated by Django 4.1.5 on 2023-01-13 18:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0007_alter_comment_user'),
    ]

    operations = [
        migrations.AddField(
            model_name='comment',
            name='imageURL',
            field=models.CharField(blank=True, max_length=150, null=True),
        ),
        migrations.AddField(
            model_name='skater',
            name='imageURL',
            field=models.CharField(blank=True, max_length=150, null=True),
        ),
        migrations.AddField(
            model_name='spot',
            name='imageURL',
            field=models.CharField(blank=True, max_length=150, null=True),
        ),
    ]