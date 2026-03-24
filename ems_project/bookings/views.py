from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Booking, Attendee
from .serializers import BookingSerializer, AttendeeSerializer
from events.models import Event
import uuid


class BookingViewSet(viewsets.ModelViewSet):
    serializer_class = BookingSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Booking.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        event_id = serializer.validated_data.pop('event_id', None)
        if not event_id:
            return Response({'error': 'event_id is required'}, status=status.HTTP_400_BAD_REQUEST)
        
        event = Event.objects.get(id=event_id)
        
        if event.current_attendees + serializer.validated_data.get('number_of_tickets', 1) > event.capacity:
            return Response({'error': 'Not enough seats available'}, status=status.HTTP_400_BAD_REQUEST)
        
        booking = serializer.save(user=self.request.user, event=event)
        event.current_attendees += booking.number_of_tickets
        event.save()
        
        # Create attendee ticket
        Attendee.objects.create(
            booking=booking,
            ticket_number=f"TICKET-{uuid.uuid4().hex[:8].upper()}"
        )

    @action(detail=False, methods=['get'])
    def my_bookings(self, request):
        bookings = Booking.objects.filter(user=request.user).order_by('-booking_date')
        serializer = self.get_serializer(bookings, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['post'])
    def cancel(self, request, pk=None):
        booking = self.get_object()
        if booking.status == 'cancelled':
            return Response({'error': 'Booking already cancelled'}, status=status.HTTP_400_BAD_REQUEST)
        
        booking.status = 'cancelled'
        booking.save()
        
        # Free up the seat
        booking.event.current_attendees -= booking.number_of_tickets
        booking.event.save()
        
        return Response({'message': 'Booking cancelled successfully'})

    @action(detail=True, methods=['post'])
    def confirm(self, request, pk=None):
        booking = self.get_object()
        if booking.status != 'pending':
            return Response({'error': 'Only pending bookings can be confirmed'}, status=status.HTTP_400_BAD_REQUEST)
        
        booking.status = 'confirmed'
        booking.save()
        
        return Response(self.get_serializer(booking).data)


class AttendeeViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Attendee.objects.all()
    serializer_class = AttendeeSerializer
    permission_classes = [IsAuthenticated]

    @action(detail=True, methods=['post'])
    def check_in(self, request, pk=None):
        attendee = self.get_object()
        from django.utils import timezone
        attendee.checked_in = True
        attendee.checked_in_at = timezone.now()
        attendee.save()
        
        return Response(self.get_serializer(attendee).data)
