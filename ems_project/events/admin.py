from django.contrib import admin
from .models import Event, Category, EventImage


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'created_at')
    search_fields = ('name',)


@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ('title', 'organizer', 'category', 'start_date', 'price', 'status', 'current_attendees', 'capacity')
    list_filter = ('status', 'category', 'start_date', 'created_at')
    search_fields = ('title', 'description', 'location', 'organizer__username')
    readonly_fields = ('current_attendees', 'created_at', 'updated_at')
    fieldsets = (
        ('Event Information', {
            'fields': ('title', 'description', 'category', 'organizer')
        }),
        ('Location', {
            'fields': ('location', 'city', 'state', 'latitude', 'longitude')
        }),
        ('Date & Time', {
            'fields': ('start_date', 'end_date')
        }),
        ('Pricing & Capacity', {
            'fields': ('price', 'capacity', 'current_attendees')
        }),
        ('Media', {
            'fields': ('image',)
        }),
        ('Status', {
            'fields': ('status', 'is_featured')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        })
    )


@admin.register(EventImage)
class EventImageAdmin(admin.ModelAdmin):
    list_display = ('event', 'uploaded_at')
    list_filter = ('event', 'uploaded_at')
    search_fields = ('event__title',)
