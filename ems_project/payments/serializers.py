from rest_framework import serializers
from .models import Payment, PaymentHistory, Refund
from bookings.serializers import BookingSerializer


class PaymentHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = PaymentHistory
        fields = ['id', 'old_status', 'new_status', 'reason', 'created_at']
        read_only_fields = ['id', 'created_at']


class PaymentSerializer(serializers.ModelSerializer):
    booking = BookingSerializer(read_only=True)
    booking_id = serializers.IntegerField(write_only=True)
    history = PaymentHistorySerializer(many=True, read_only=True)

    class Meta:
        model = Payment
        fields = ['id', 'booking', 'booking_id', 'amount', 'currency', 'payment_method', 
                  'status', 'transaction_id', 'stripe_payment_intent_id', 'paid_at', 
                  'created_at', 'updated_at', 'notes', 'history', 'is_paid']
        read_only_fields = ['id', 'transaction_id', 'paid_at', 'created_at', 'updated_at', 'is_paid']


class RefundSerializer(serializers.ModelSerializer):
    payment = PaymentSerializer(read_only=True)
    payment_id = serializers.IntegerField(write_only=True)

    class Meta:
        model = Refund
        fields = ['id', 'payment', 'payment_id', 'amount', 'reason', 'status', 
                  'refund_transaction_id', 'requested_at', 'completed_at', 'notes']
        read_only_fields = ['id', 'refund_transaction_id', 'requested_at', 'completed_at']
