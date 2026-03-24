from django.db import models
from bookings.models import Booking


class Payment(models.Model):
    PAYMENT_METHOD_CHOICES = [
        ('stripe', 'Stripe'),
        ('paypal', 'PayPal'),
        ('card', 'Credit/Debit Card'),
        ('upi', 'UPI'),
    ]
    
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('processing', 'Processing'),
        ('completed', 'Completed'),
        ('failed', 'Failed'),
        ('refunded', 'Refunded'),
    ]

    booking = models.OneToOneField(Booking, on_delete=models.CASCADE, related_name='payment')
    
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    currency = models.CharField(max_length=3, default='USD')
    
    payment_method = models.CharField(max_length=20, choices=PAYMENT_METHOD_CHOICES)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    
    transaction_id = models.CharField(max_length=255, unique=True, blank=True, null=True)
    stripe_payment_intent_id = models.CharField(max_length=255, blank=True, null=True)
    
    paid_at = models.DateTimeField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    notes = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"Payment #{self.id} - {self.booking.user.username} - {self.status}"

    @property
    def is_paid(self):
        return self.status == 'completed'

    class Meta:
        db_table = 'payments'
        ordering = ['-created_at']


class PaymentHistory(models.Model):
    payment = models.ForeignKey(Payment, on_delete=models.CASCADE, related_name='history')
    
    old_status = models.CharField(max_length=20)
    new_status = models.CharField(max_length=20)
    
    reason = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Payment #{self.payment.id} - {self.old_status} → {self.new_status}"

    class Meta:
        db_table = 'payment_history'
        verbose_name_plural = 'Payment Histories'
        ordering = ['-created_at']


class Refund(models.Model):
    REFUND_REASON_CHOICES = [
        ('cancelled_event', 'Event Cancelled'),
        ('user_request', 'User Request'),
        ('duplicate_payment', 'Duplicate Payment'),
        ('system_error', 'System Error'),
        ('other', 'Other'),
    ]
    
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('processing', 'Processing'),
        ('completed', 'Completed'),
        ('failed', 'Failed'),
    ]

    payment = models.OneToOneField(Payment, on_delete=models.CASCADE, related_name='refund')
    
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    reason = models.CharField(max_length=50, choices=REFUND_REASON_CHOICES)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    
    refund_transaction_id = models.CharField(max_length=255, blank=True, null=True)
    
    requested_at = models.DateTimeField(auto_now_add=True)
    completed_at = models.DateTimeField(blank=True, null=True)
    
    notes = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"Refund #{self.id} - {self.payment.booking.user.username} - {self.status}"

    class Meta:
        db_table = 'refunds'
        ordering = ['-requested_at']
