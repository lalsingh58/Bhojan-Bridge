from rest_framework import serializers
from .models import SurplusItem

class SurplusItemSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.email')  # optional

    class Meta:
        model = SurplusItem
        fields = '__all__'
        read_only_fields = ['user', 'created_at', 'is_claimed']
