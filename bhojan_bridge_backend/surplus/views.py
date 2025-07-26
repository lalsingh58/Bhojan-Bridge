# surplus/views.py

from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status, permissions
from .models import SurplusItem
from .serializers import SurplusItemSerializer
from django.contrib.auth import get_user_model

User = get_user_model()


@api_view(['GET', 'POST'])
@permission_classes([permissions.IsAuthenticated])
def surplus_list_create(request):
    if request.method == 'GET':
        items = SurplusItem.objects.filter(is_claimed=False).order_by('-created_at')
        serializer = SurplusItemSerializer(items, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = SurplusItemSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PATCH', 'DELETE'])
@permission_classes([permissions.IsAuthenticated])
def surplus_detail(request, pk):
    try:
        item = SurplusItem.objects.get(pk=pk)
    except SurplusItem.DoesNotExist:
        return Response({"error": "Item not found."}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = SurplusItemSerializer(item)
        return Response(serializer.data)

    elif request.method == 'PATCH':
        if request.data.get('is_claimed'):
            item.is_claimed = True
            item.claimed_by = request.user
            item.save()
            serializer = SurplusItemSerializer(item)
            return Response(serializer.data)
        else:
            serializer = SurplusItemSerializer(item, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        if item.user != request.user:
            return Response({"error": "Not allowed."}, status=status.HTTP_403_FORBIDDEN)
        item.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def profile_view(request):
    shared = SurplusItem.objects.filter(user=request.user)
    claimed = SurplusItem.objects.filter(claimed_by=request.user)
    shared_serializer = SurplusItemSerializer(shared, many=True)
    claimed_serializer = SurplusItemSerializer(claimed, many=True)
    return Response({
        "shared": shared_serializer.data,
        "claimed": claimed_serializer.data
    })


@api_view(['PATCH'])
@permission_classes([permissions.IsAuthenticated])
def claim_surplus(request, pk):
    try:
        item = SurplusItem.objects.get(pk=pk)
    except SurplusItem.DoesNotExist:
        return Response({'error': 'Item not found'}, status=status.HTTP_404_NOT_FOUND)

    if item.is_claimed:
        return Response({'error': 'Item already claimed'}, status=status.HTTP_400_BAD_REQUEST)

    item.is_claimed = True
    item.save()

    return Response({'message': 'Item successfully claimed'}, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def user_surplus_activity(request):
    user = request.user
    shared_items = SurplusItem.objects.filter(user=user)
    claimed_items = SurplusItem.objects.filter(is_claimed=True).exclude(user=user)

    shared_serializer = SurplusItemSerializer(shared_items, many=True)
    claimed_serializer = SurplusItemSerializer(claimed_items, many=True)

    return Response({
        "shared": shared_serializer.data,
        "claimed": claimed_serializer.data
    })