from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Service
from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer

@receiver(post_save, sender=Service)
def service_status_updated(sender, instance, **kwargs):
    """
    Signal triggered whenever a Service instance is saved.
    Broadcast the status update via WebSocket.
    """
    # Get the channel layer for WebSocket communication
    channel_layer = get_channel_layer()

    # Construct the message
    message = {
        "type": "status_update",
        "message": f"Service {instance.name} status updated to {instance.status}."
    }

    # Send the message to the WebSocket group
    async_to_sync(channel_layer.group_send)(
        "status_updates",  # Group name
        message,
    )
