from rest_framework import serializers
from .models import Booking, Attendee
from events.serializers import EventListSerializer
from users.serializers import UserSerializer


class AttendeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attendee
        fields = ['id', 'ticket_number', 'checked_in', 'checked_in_at']
        read_only_fields = ['id', 'ticket_number', 'checked_in_at']


class BookingSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    event = EventListSerializer(read_only=True)
    event_id = serializers.IntegerField(write_only=True)
    attendee = AttendeeSerializer(read_only=True)

    class Meta:
        model = Booking
        fields = ['id', 'user', 'event', 'event_id', 'number_of_tickets', 'total_price', 
                  'status', 'booking_date', 'updated_at', 'notes', 'attendee']
        read_only_fields = ['id', 'user', 'total_price', 'booking_date', 'updated_at']

    def create(self, validated_data):
        event_id = validated_data.pop('event_id')
        event = Event.objects.get(id=event_id)
        validated_data['event'] = event
        validated_data['user'] = self.context['request'].user
        return Booking.objects.create(**validated_data)


from events.models import Event
