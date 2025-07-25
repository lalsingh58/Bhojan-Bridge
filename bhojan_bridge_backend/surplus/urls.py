from django.urls import path
from . import views

urlpatterns = [
    path('surplus/', views.surplus_list_create, name='surplus-list-create'),
    path('surplus/<int:pk>/', views.surplus_detail, name='surplus-detail'),
     path('surplus/claim/<int:pk>/', views.claim_surplus, name='surplus-claim'),
]
