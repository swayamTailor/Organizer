from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.utils import timezone
import stripe
from django.conf import settings
from .models import Payment, Refund, PaymentHistory
from .serializers import PaymentSerializer, RefundSerializer
from bookings.models import Booking

stripe.api_key = settings.STRIPE_SECRET_KEY


class PaymentViewSet(viewsets.ModelViewSet):
    serializer_class = PaymentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Payment.objects.filter(booking__user=self.request.user)

    @action(detail=False, methods=['post'])
    def create_payment(self, request):
        booking_id = request.data.get('booking_id')
        payment_method = request.data.get('payment_method', 'stripe')
        
        try:
            booking = Booking.objects.get(id=booking_id, user=request.user)
        except Booking.DoesNotExist:
            return Response({'error': 'Booking not found'}, status=status.HTTP_404_NOT_FOUND)
        
        # Check if payment already exists
        if Payment.objects.filter(booking=booking).exists():
            return Response({'error': 'Payment already exists for this booking'}, 
                          status=status.HTTP_400_BAD_REQUEST)
        
        payment = Payment.objects.create(
            booking=booking,
            amount=booking.total_price,
            payment_method=payment_method,
            status='pending'
        )
        
        serializer = self.get_serializer(payment)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    @action(detail=True, methods=['post'])
    def process_stripe_payment(self, request, pk=None):
        payment = self.get_object()
        token = request.data.get('token')  # Stripe token from frontend
        
        try:
            # Create Stripe payment intent
            intent = stripe.PaymentIntent.create(
                amount=int(payment.amount * 100),  # Convert to cents
                currency=payment.currency.lower(),
                payment_method=token,
                confirm=True,
                metadata={
                    'payment_id': payment.id,
                    'booking_id': payment.booking.id
                }
            )
            
            if intent.status == 'succeeded':
                payment.status = 'completed'
                payment.transaction_id = intent.id
                payment.stripe_payment_intent_id = intent.id
                payment.paid_at = timezone.now()
                payment.save()
                
                # Update booking status
                payment.booking.status = 'confirmed'
                payment.booking.save()
                
                # Record payment history
                PaymentHistory.objects.create(
                    payment=payment,
                    old_status='pending',
                    new_status='completed',
                    reason='Stripe payment successful'
                )
                
                return Response(self.get_serializer(payment).data)
            else:
                payment.status = 'failed'
                payment.save()
                return Response({'error': f'Payment failed: {intent.status}'}, 
                              status=status.HTTP_400_BAD_REQUEST)
                
        except stripe.error.CardError as e:
            payment.status = 'failed'
            payment.save()
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['post'])
    def verify_payment(self, request, pk=None):
        payment = self.get_object()
        
        if payment.status == 'completed':
            return Response({'message': 'Payment already completed'}, status=status.HTTP_200_OK)
        
        return Response(self.get_serializer(payment).data)


class RefundViewSet(viewsets.ModelViewSet):
    serializer_class = RefundSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Refund.objects.filter(payment__booking__user=self.request.user)

    def perform_create(self, serializer):
        refund = serializer.save()
        payment = refund.payment
        
        # Update booking status
        payment.booking.status = 'cancelled'
        payment.booking.save()

    @action(detail=True, methods=['post'])
    def process_refund(self, request, pk=None):
        refund = self.get_object()
        payment = refund.payment
        
        if payment.status != 'completed':
            return Response({'error': 'Can only refund completed payments'}, 
                          status=status.HTTP_400_BAD_REQUEST)
        
        try:
            if payment.stripe_payment_intent_id:
                # Refund via Stripe
                refund_obj = stripe.Refund.create(
                    payment_intent=payment.stripe_payment_intent_id,
                    amount=int(refund.amount * 100)
                )
                
                refund.status = 'completed'
                refund.refund_transaction_id = refund_obj.id
                refund.completed_at = timezone.now()
                refund.save()
                
                payment.status = 'refunded'
                payment.save()
                
                return Response(self.get_serializer(refund).data)
            
            return Response({'error': 'No stripe payment to refund'}, 
                          status=status.HTTP_400_BAD_REQUEST)
                
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
