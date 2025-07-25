from django.db import models
from django.conf import settings

class SurplusItem(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='surplus_items'
    )
    item_name = models.CharField(max_length=100)
    quantity = models.FloatField()
    unit = models.CharField(max_length=20)  # e.g., kg, liter
    description = models.TextField(blank=True, null=True)
    is_donated = models.BooleanField(default=False)
    is_claimed = models.BooleanField(default=False)
    claimed_by = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True, related_name='claimed_items'
    )
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.item_name} - {self.quantity} {self.unit}"
