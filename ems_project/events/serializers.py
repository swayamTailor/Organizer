from rest_framework import serializers
from .models import Event, Category, EventImage


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'description', 'icon', 'created_at']
        read_only_fields = ['id', 'created_at']


class EventImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = EventImage
        fields = ['id', 'image', 'uploaded_at']
        read_only_fields = ['id', 'uploaded_at']


class EventListSerializer(serializers.ModelSerializer):
    category = CategorySerializer()
    organizer_name = serializers.CharField(source='organizer.get_full_name', read_only=True)
    is_available = serializers.BooleanField(read_only=True)
    remaining_seats = serializers.IntegerField(read_only=True)

    class Meta:
        model = Event
        fields = ['id', 'title', 'category', 'organizer_name', 'location', 'city', 
                  'start_date', 'price', 'capacity', 'current_attendees', 'remaining_seats',
                  'image', 'status', 'is_featured', 'is_available', 'created_at']
        read_only_fields = ['id', 'current_attendees', 'created_at']


class EventDetailSerializer(serializers.ModelSerializer):
    category = CategorySerializer()
    organizer_name = serializers.CharField(source='organizer.get_full_name', read_only=True)
    organizer_id = serializers.CharField(source='organizer.id', read_only=True)
    images = EventImageSerializer(many=True, read_only=True)
    is_available = serializers.BooleanField(read_only=True)
    remaining_seats = serializers.IntegerField(read_only=True)

    class Meta:
        model = Event
        fields = ['id', 'title', 'description', 'category', 'organizer_id', 'organizer_name', 
                  'location', 'city', 'state', 'latitude', 'longitude', 
                  'start_date', 'end_date', 'price', 'capacity', 'current_attendees', 
                  'remaining_seats', 'image', 'images', 'status', 'is_featured', 
                  'is_available', 'created_at', 'updated_at']
        read_only_fields = ['id', 'current_attendees', 'created_at', 'updated_at']
