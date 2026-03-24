from rest_framework import viewsets, filters, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.utils import timezone
from django_filters.rest_framework import DjangoFilterBackend
from .models import Event, Category, EventImage
from .serializers import EventListSerializer, EventDetailSerializer, CategorySerializer, EventImageSerializer


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [AllowAny]
    filter_backends = [filters.SearchFilter]
    search_fields = ['name']


class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['category', 'status', 'city']
    search_fields = ['title', 'description', 'location', 'city']
    ordering_fields = ['start_date', 'price', 'created_at']
    ordering = ['-start_date']

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return EventDetailSerializer
        return EventListSerializer

    def get_permissions(self):
        if self.action in ['list', 'retrieve', 'upcoming', 'featured', 'search']:
            permission_classes = [AllowAny]
        else:
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]

    def perform_create(self, serializer):
        serializer.save(organizer=self.request.user)

    def perform_update(self, serializer):
        event = self.get_object()
        if event.organizer != self.request.user and not self.request.user.is_staff:
            return Response({'error': 'You do not have permission to update this event'}, 
                          status=status.HTTP_403_FORBIDDEN)
        serializer.save()

    @action(detail=False, methods=['get'], permission_classes=[AllowAny])
    def upcoming(self, request):
        events = Event.objects.filter(status='upcoming', start_date__gte=timezone.now())
        serializer = EventListSerializer(events, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'], permission_classes=[AllowAny])
    def featured(self, request):
        events = Event.objects.filter(is_featured=True, status='upcoming')
        serializer = EventListSerializer(events, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['post'])
    def book(self, request, pk=None):
        event = self.get_object()
        if not event.is_available:
            return Response({'error': 'Event is full or not available'}, status=status.HTTP_400_BAD_REQUEST)
        
        # This will be handled by bookings app
        return Response({'message': 'Use /api/bookings/ endpoint to book this event'})

    @action(detail=True, methods=['get'])
    def bookings(self, request, pk=None):
        from bookings.models import Booking
        event = self.get_object()
        bookings = Booking.objects.filter(event=event)
        return Response({
            'event_id': event.id,
            'total_bookings': bookings.count(),
            'confirmed_bookings': bookings.filter(status='confirmed').count()
        })
