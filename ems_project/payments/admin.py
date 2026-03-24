from django.contrib import admin
from .models import Payment, PaymentHistory, Refund


@admin.register(Payment)
class PaymentAdmin(admin.ModelAdmin):
    list_display = ('id', 'booking', 'amount', 'payment_method', 'status', 'paid_at', 'created_at')
    list_filter = ('status', 'payment_method', 'created_at')
    search_fields = ('booking__user__username', 'transaction_id')
    readonly_fields = ('created_at', 'updated_at', 'paid_at')


@admin.register(PaymentHistory)
class PaymentHistoryAdmin(admin.ModelAdmin):
    list_display = ('payment', 'old_status', 'new_status', 'created_at')
    list_filter = ('old_status', 'new_status', 'created_at')
    search_fields = ('payment__id',)


@admin.register(Refund)
class RefundAdmin(admin.ModelAdmin):
    list_display = ('id', 'payment', 'amount', 'reason', 'status', 'requested_at', 'completed_at')
    list_filter = ('status', 'reason', 'requested_at')
    search_fields = ('payment__booking__user__username',)
