from django.contrib.auth.models import AbstractUser, Group, Permission,BaseUserManager
from django.db import models
from django.utils.translation import gettext_lazy as _

class CustomUserManager(BaseUserManager):
    """
    Custom manager for User to handle the is_admin field.
    """
    def create_user(self, username, email, password=None, is_admin=False, **extra_fields):
        if not email:
            raise ValueError("The Email field must be set")
        email = self.normalize_email(email)
        user = self.model(username=username, email=email, is_admin=is_admin, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, email, password=None, **extra_fields):
        extra_fields.setdefault('is_admin', True)
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        return self.create_user(username, email, password, **extra_fields)
    
class User(AbstractUser):
    email = models.EmailField(unique=True)
    organization = models.ForeignKey('Organization', on_delete=models.CASCADE, null=True, blank=True)
    is_admin = models.BooleanField(default=False)  # Organization-level admin flag

    objects = CustomUserManager() 
    
    groups = models.ManyToManyField(
        Group,
        related_name='custom_user_groups',  # Avoid conflict with auth.User.groups
        blank=True,
        verbose_name='groups',
        help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.',
    )
    user_permissions = models.ManyToManyField(
        Permission,
        related_name='custom_user_permissions',  # Avoid conflict with auth.User.user_permissions
        blank=True,
        verbose_name='user permissions',
        help_text='Specific permissions for this user.',
    )

    def __str__(self):
        return self.username
    
    
# Organization Model (Multi-Tenant Support)
class Organization(models.Model):
    name = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

# Service Model
class Service(models.Model):
    STATUS_CHOICES = [
        ('operational', 'Operational'),
        ('degraded_performance', 'Degraded Performance'),
        ('partial_outage', 'Partial Outage'),
        ('major_outage', 'Major Outage'),
    ]
    
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    organization = models.ForeignKey(Organization, on_delete=models.CASCADE, related_name="services")
    status = models.CharField(max_length=50, choices=STATUS_CHOICES, default='operational')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

# Incident Model
class Incident(models.Model):
    INCIDENT_STATUS_CHOICES = [
        ('open', 'Open'),
        ('in_progress', 'In Progress'),
        ('resolved', 'Resolved'),
    ]

    title = models.CharField(max_length=255)
    description = models.TextField()
    organization = models.ForeignKey(Organization, on_delete=models.CASCADE, related_name="incidents")
    services = models.ManyToManyField(Service, related_name="incidents")
    status = models.CharField(max_length=50, choices=INCIDENT_STATUS_CHOICES, default='open')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    resolved_at = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return self.title

# Maintenance Model
class Maintenance(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    organization = models.ForeignKey(Organization, on_delete=models.CASCADE, related_name="maintenances")
    services = models.ManyToManyField(Service, related_name="maintenances")
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

# Status Update Model (for ongoing incidents)
class StatusUpdate(models.Model):
    incident = models.ForeignKey(Incident, on_delete=models.CASCADE, related_name="updates")
    update_text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Update for {self.incident.title} at {self.created_at}"