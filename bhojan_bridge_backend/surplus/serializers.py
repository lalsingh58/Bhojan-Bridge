from rest_framework import serializers
from .models import SurplusItem
from django.contrib.auth import get_user_model

User = get_user_model()

class UserPublicSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']  # ✅ ONLY user fields

class SurplusItemSerializer(serializers.ModelSerializer):
    user = UserPublicSerializer(read_only=True)
    claimed_by = UserPublicSerializer(read_only=True)

    class Meta:
        model = SurplusItem
        fields = '__all__'
