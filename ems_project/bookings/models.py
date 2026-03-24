from django.db import models
from django.contrib.auth.models import User
from events.models import Event


class Booking(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('confirmed', 'Confirmed'),
        ('cancelled', 'Cancelled'),
        ('completed', 'Completed'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='bookings')
    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name='bookings')
    
    number_of_tickets = models.IntegerField(default=1)
    total_price = models.DecimalField(max_digits=10, decimal_places=2)
    
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    
    booking_date = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    notes = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"Booking #{self.id} - {self.user.username} for {self.event.title}"

    def save(self, *args, **kwargs):
        if not self.pk:  # Only calculate on creation
            self.total_price = self.event.price * self.number_of_tickets
        super().save(*args, **kwargs)

    class Meta:
        db_table = 'bookings'
        ordering = ['-booking_date']
        unique_together = ('user', 'event')  # One booking per user per event


class Attendee(models.Model):
    booking = models.OneToOneField(Booking, on_delete=models.CASCADE, related_name='attendee')
    ticket_number = models.CharField(max_length=50, unique=True)
    checked_in = models.BooleanField(default=False)
    checked_in_at = models.DateTimeField(blank=True, null=True)

    def __str__(self):
        return f"Attendee {self.ticket_number} - {self.booking.event.title}"

    class Meta:
        db_table = 'attendees'
