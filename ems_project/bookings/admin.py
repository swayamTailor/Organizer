from django.contrib import admin
from .models import Booking, Attendee


@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'event', 'number_of_tickets', 'total_price', 'status', 'booking_date')
    list_filter = ('status', 'booking_date', 'event')
    search_fields = ('user__username', 'event__title')
    readonly_fields = ('booking_date', 'updated_at')
    fieldsets = (
        ('Booking Information', {
            'fields': ('user', 'event', 'number_of_tickets', 'total_price', 'status')
        }),
        ('Timestamps', {
            'fields': ('booking_date', 'updated_at'),
            'classes': ('collapse',)
        }),
        ('Additional Notes', {
            'fields': ('notes',),
            'classes': ('collapse',)
        })
    )


@admin.register(Attendee)
class AttendeeAdmin(admin.ModelAdmin):
    list_display = ('ticket_number', 'booking', 'checked_in', 'checked_in_at')
    list_filter = ('checked_in', 'checked_in_at')
    search_fields = ('ticket_number', 'booking__user__username')
    readonly_fields = ('ticket_number',)
