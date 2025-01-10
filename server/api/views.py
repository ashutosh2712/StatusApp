from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework import viewsets, status
from django.contrib.auth import get_user_model
from rest_framework.exceptions import NotFound, ValidationError
from django.contrib.auth.hashers import make_password
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated  
User = get_user_model()
from api.models import Organization, Service, Incident, Maintenance


class UserViewSet(viewsets.ViewSet):
    """
    A ViewSet for managing users (register, list, update, and delete).
    """

    @action(detail=False, methods=["post"], url_path="register-user")
    def register(self, request):
        """
        API to register a new user.
        """
        data = request.data
        username = data.get("username")
        email = data.get("email")
        password = data.get("password")
        is_admin = data.get("is_admin", False)

        if not username or not email or not password:
            raise ValidationError({"error": "Username, email, and password are required fields."})

        # Use the custom manager to create the user
        user = User.objects.create_user(
            username=username,
            email=email,
            password=password,
            is_admin=is_admin
        )

        # Generate a token for the user
        token, _ = Token.objects.get_or_create(user=user)

        return Response(
            {
                "message": "User registered successfully.",
                "user": {"id": user.id, "username": user.username, "email": user.email, "is_admin": user.is_admin},
                "token": token.key,
            },
            status=201,
        )
        
    @action(detail=False, methods=["post"], url_path="login")

    def login(self, request):
        """
        Authenticate user and return token.
        """
        username = request.data.get("username")
        password = request.data.get("password")

        if not username or not password:
            return Response({"error": "Username and password are required."}, status=400)

        from django.contrib.auth import authenticate
        user = authenticate(username=username, password=password)

        if not user:
            return Response({"error": "Invalid credentials."}, status=401)

        # Get or create token for the user
        token, _ = Token.objects.get_or_create(user=user)

        return Response({"token": token.key, "user_id": user.id, "username": user.username})
    
    @action(detail=False, methods=["get"], url_path="list-users")
    def list_users(self, request):
        """
        API to list all users.
        """
        users = User.objects.all().values("id", "username", "email", "is_admin")
        return Response(users, status=status.HTTP_200_OK)

    @action(detail=True, methods=["put"], url_path="update-user")
    def update_user(self, request, pk=None):
        """
        API to update user details.
        """
        try:
            user = User.objects.get(pk=pk)
        except User.DoesNotExist:
            raise NotFound({"error": "User not found."})

        data = request.data
        username = data.get("username")
        email = data.get("email")
        is_admin = data.get("is_admin")

        # Update fields if provided
        if username:
            user.username = username
        if email:
            user.email = email
        if is_admin is not None:
            user.is_admin = is_admin

        user.save()

        return Response(
            {
                "message": f"User with id {pk} updated successfully.",
                "user": {"id": user.id, "username": user.username, "email": user.email, "is_admin": user.is_admin},
            },
            status=status.HTTP_200_OK,
        )

    @action(detail=True, methods=["delete"], url_path="delete-user")
    def delete_user(self, request, pk=None):
        """
        API to delete a user.
        """
        try:
            user = User.objects.get(pk=pk)
        except User.DoesNotExist:
            raise NotFound({"error": "User not found."})

        user.delete()

        return Response({"message": f"User with id {pk} deleted successfully."}, status=status.HTTP_204_NO_CONTENT)


class OrganizationViewSet(viewsets.ViewSet):
    """
    A ViewSet for managing organizations (register, list, update, and delete).
    """

    @action(detail=False, methods=["post"], url_path="register-organization")
    @permission_classes([IsAuthenticated])  # Protect the endpoint
    def register(self, request):
        """
        API to register a new organization.
        """
        data = request.data
        name = data.get("name")

        # Validate input data
        if not name:
            raise ValidationError({"error": "Organization name is required."})

        # Create the organization
        organization = Organization.objects.create(name=name)

        return Response(
            {
                "message": "Organization registered successfully.",
                "organization": {
                    "id": organization.id,
                    "name": organization.name,
                    "created_at": organization.created_at,
                    "updated_at": organization.updated_at,
                },
            },
            status=status.HTTP_201_CREATED,
        )

    @action(detail=False, methods=["get"], url_path="list-organizations")
    @permission_classes([IsAuthenticated])  # Protect the endpoint
    def list(self, request):
        """
        API to list all organizations.
        """
        organizations = Organization.objects.all().values("id", "name", "created_at", "updated_at")
        return Response(list(organizations), status=status.HTTP_200_OK)

    @action(detail=True, methods=["put"], url_path="update-organization")
    @permission_classes([IsAuthenticated])  # Protect the endpoint
    def update(self, request, pk=None):
        """
        API to update organization details.
        """
        try:
            organization = Organization.objects.get(pk=pk)
        except Organization.DoesNotExist:
            raise NotFound({"error": "Organization not found."})

        data = request.data
        name = data.get("name")

        if name:
            organization.name = name

        organization.save()

        return Response(
            {
                "message": f"Organization with id {pk} updated successfully.",
                "organization": {
                    "id": organization.id,
                    "name": organization.name,
                    "created_at": organization.created_at,
                    "updated_at": organization.updated_at,
                },
            },
            status=status.HTTP_200_OK,
        )

    @action(detail=True, methods=["delete"], url_path="delete-organization")
    @permission_classes([IsAuthenticated])  # Protect the endpoint
    def delete(self, request, pk=None):
        """
        API to delete an organization.
        """
        try:
            organization = Organization.objects.get(pk=pk)
        except Organization.DoesNotExist:
            raise NotFound({"error": "Organization not found."})

        organization.delete()

        return Response(
            {"message": f"Organization with id {pk} deleted successfully."},
            status=status.HTTP_204_NO_CONTENT,
        )
        
class ServiceViewSet(viewsets.ViewSet):
    """
    A ViewSet for managing services.
    """

    @action(detail=False, methods=["post"], url_path="register-service")
    @permission_classes([IsAuthenticated])  # Protect the endpoint
    def register(self, request):
        """
        API to register a new service.
        """
        data = request.data
        name = data.get("name")
        description = data.get("description", "")
        status = data.get("status", "operational")
        organization_id = data.get("organization_id")

        # Validate input data
        if not name or not organization_id:
            raise ValidationError({"error": "Name and organization_id are required fields."})

        # Check if organization exists
        try:
            organization = Organization.objects.get(id=organization_id)
        except Organization.DoesNotExist:
            raise NotFound({"error": "Organization not found."})

        # Create the service
        service = Service.objects.create(
            name=name,
            description=description,
            status=status,
            organization=organization,
        )

        return Response(
            {
                "message": "Service registered successfully.",
                "service": {
                    "id": service.id,
                    "name": service.name,
                    "status": service.status,
                    "organization_id": service.organization.id,
                },
            },
            status=status.HTTP_201_CREATED,
        )

    @action(detail=False, methods=["get"], url_path="list-services")
    @permission_classes([IsAuthenticated])  # Protect the endpoint
    def list(self, request):
        """
        API to list all services.
        """
        # Filter services by user's organization if needed
        organization_id = request.query_params.get("organization_id")

        if organization_id:
            services = Service.objects.filter(organization_id=organization_id)
        else:
            services = Service.objects.all()

        services_data = services.values("id", "name", "status", "description", "organization_id")

        return Response(services_data, status=status.HTTP_200_OK)

    @action(detail=True, methods=["put"], url_path="update-service")
    @permission_classes([IsAuthenticated])  # Protect the endpoint
    def update(self, request, pk=None):
        """
        API to update service details.
        """
        try:
            service = Service.objects.get(pk=pk)
        except Service.DoesNotExist:
            raise NotFound({"error": "Service not found."})

        data = request.data
        name = data.get("name")
        description = data.get("description")
        status = data.get("status")

        # Update fields if provided
        if name:
            service.name = name
        if description:
            service.description = description
        if status:
            service.status = status

        service.save()

        return Response(
            {
                "message": f"Service with id {pk} updated successfully.",
                "service": {
                    "id": service.id,
                    "name": service.name,
                    "status": service.status,
                    "description": service.description,
                    "organization_id": service.organization.id,
                },
            },
            status=status.HTTP_200_OK,
        )

    @action(detail=True, methods=["delete"], url_path="delete-service")
    @permission_classes([IsAuthenticated])  # Protect the endpoint
    def delete(self, request, pk=None):
        """
        API to delete a service.
        """
        try:
            service = Service.objects.get(pk=pk)
        except Service.DoesNotExist:
            raise NotFound({"error": "Service not found."})

        service.delete()

        return Response(
            {"message": f"Service with id {pk} deleted successfully."},
            status=status.HTTP_204_NO_CONTENT,
        )   



class IncidentViewSet(viewsets.ViewSet):
    """
    A ViewSet for managing incidents.
    """

    @action(detail=False, methods=["post"], url_path="create-incident")
    @permission_classes([IsAuthenticated])  # Protect the endpoint
    def create_incident(self, request):
        """
        API to create a new incident.
        """
        data = request.data
        title = data.get("title")
        description = data.get("description", "")
        status = data.get("status", "open")
        organization_id = data.get("organization_id")
        service_ids = data.get("service_ids", [])

        # Validate required fields
        if not title or not organization_id:
            raise ValidationError({"error": "Title and organization_id are required fields."})

        # Check if organization exists
        try:
            organization = Organization.objects.get(id=organization_id)
        except Organization.DoesNotExist:
            raise NotFound({"error": "Organization not found."})

        # Fetch related services
        services = Service.objects.filter(id__in=service_ids)

        # Create the incident
        incident = Incident.objects.create(
            title=title,
            description=description,
            status=status,
            organization=organization,
        )

        # Associate services with the incident
        incident.services.set(services)
        incident.save()

        return Response(
            {
                "message": "Incident created successfully.",
                "incident": {
                    "id": incident.id,
                    "title": incident.title,
                    "description": incident.description,
                    "status": incident.status,
                    "created_at": incident.created_at,
                    "organization_id": organization.id,
                    "service_ids": [service.id for service in services],
                },
            },
            status=status.HTTP_201_CREATED,
        )

    @action(detail=False, methods=["get"], url_path="list-incidents")
    @permission_classes([IsAuthenticated])  # Protect the endpoint
    def list(self, request):
        """
        API to list all incidents.
        """
        organization_id = request.query_params.get("organization_id")

        if organization_id:
            incidents = Incident.objects.filter(organization_id=organization_id)
        else:
            incidents = Incident.objects.all()

        incidents_data = []
        for incident in incidents:
            incidents_data.append({
                "id": incident.id,
                "title": incident.title,
                "description": incident.description,
                "status": incident.status,
                "created_at": incident.created_at,
                "organization_id": incident.organization.id,
                "service_ids": list(incident.services.values_list("id", flat=True)),
            })

        return Response(incidents_data, status=status.HTTP_200_OK)

    @action(detail=True, methods=["put"], url_path="update-incident")
    @permission_classes([IsAuthenticated])  # Protect the endpoint
    def update(self, request, pk=None):
        """
        API to update incident details.
        """
        try:
            incident = Incident.objects.get(pk=pk)
        except Incident.DoesNotExist:
            raise NotFound({"error": "Incident not found."})

        data = request.data
        title = data.get("title")
        description = data.get("description")
        status = data.get("status")
        service_ids = data.get("service_ids", [])

        # Update fields if provided
        if title:
            incident.title = title
        if description:
            incident.description = description
        if status:
            incident.status = status

        # Update associated services
        if service_ids:
            services = Service.objects.filter(id__in=service_ids)
            incident.services.set(services)

        incident.save()

        return Response(
            {
                "message": f"Incident with id {pk} updated successfully.",
                "incident": {
                    "id": incident.id,
                    "title": incident.title,
                    "description": incident.description,
                    "status": incident.status,
                    "created_at": incident.created_at,
                    "organization_id": incident.organization.id,
                    "service_ids": list(incident.services.values_list("id", flat=True)),
                },
            },
            status=status.HTTP_200_OK,
        )

    @action(detail=True, methods=["delete"], url_path="delete-incident")
    @permission_classes([IsAuthenticated])  # Protect the endpoint
    def delete(self, request, pk=None):
        """
        API to delete an incident.
        """
        try:
            incident = Incident.objects.get(pk=pk)
        except Incident.DoesNotExist:
            raise NotFound({"error": "Incident not found."})

        incident.delete()

        return Response(
            {"message": f"Incident with id {pk} deleted successfully."},
            status=status.HTTP_204_NO_CONTENT,
        )


class StatusPageViewSet(viewsets.ViewSet):
    """
    A ViewSet for public status page.
    """

    @action(detail=False, methods=["get"], url_path="current-status")
    def current_status(self, request):
        """
        API to fetch the current status of all services.
        """
        services = Service.objects.all()
        status_data = []

        for service in services:
            # Check if there are active maintenances for the service
            active_maintenances = Maintenance.objects.filter(
                services=service, start_time__lte=timezone.now(), end_time__gte=timezone.now()
            )
            maintenance_info = [
                {"id": maintenance.id, "title": maintenance.title, "description": maintenance.description}
                for maintenance in active_maintenances
            ]

            status_data.append({
                "id": service.id,
                "name": service.name,
                "status": service.status,
                "description": service.description,
                "updated_at": service.updated_at,
                "active_maintenances": maintenance_info,
            })

        return Response(
            {
                "message": "Current status fetched successfully.",
                "services": status_data,
            },
            status=status.HTTP_200_OK,
        )

    @action(detail=False, methods=["get"], url_path="incident-timeline")
    def incident_timeline(self, request):
        """
        API to fetch a timeline of incidents and maintenances.
        """
        incidents = Incident.objects.order_by("-created_at")[:10]
        maintenances = Maintenance.objects.order_by("-start_time")[:10]
        timeline_data = []

        for incident in incidents:
            timeline_data.append({
                "type": "incident",
                "id": incident.id,
                "title": incident.title,
                "description": incident.description,
                "status": incident.status,
                "created_at": incident.created_at,
                "resolved_at": incident.resolved_at,
                "organization_id": incident.organization.id,
                "service_ids": list(incident.services.values_list("id", flat=True)),
            })

        for maintenance in maintenances:
            timeline_data.append({
                "type": "maintenance",
                "id": maintenance.id,
                "title": maintenance.title,
                "description": maintenance.description,
                "start_time": maintenance.start_time,
                "end_time": maintenance.end_time,
                "organization_id": maintenance.organization.id,
                "service_ids": list(maintenance.services.values_list("id", flat=True)),
            })

        # Sort by time (newest first)
        timeline_data.sort(key=lambda x: x.get("created_at") or x.get("start_time"), reverse=True)

        return Response(
            {
                "message": "Incident and maintenance timeline fetched successfully.",
                "timeline": timeline_data,
            },
            status=status.HTTP_200_OK,
        )
        
## not sure

class TeamManagementViewSet(viewsets.ViewSet):
    """
    A ViewSet for managing teams within an organization.
    """

    @action(detail=False, methods=["post"], url_path="invite-user")
    @permission_classes([IsAuthenticated])  # Only authenticated users can invite
    def invite_user(self, request):
        """
        API to invite a user to an organization.
        """
        email = request.data.get("email")
        organization_id = request.data.get("organization_id")

        # Validate input
        if not email or not organization_id:
            raise ValidationError({"error": "Email and organization_id are required fields."})

        # Ensure the authenticated user is an admin of the organization
        if request.user.organization_id != int(organization_id) or request.user.role != "Admin":
            raise PermissionDenied("Only admins can invite users to the organization.")

        # Check if the organization exists
        try:
            organization = Organization.objects.get(id=organization_id)
        except Organization.DoesNotExist:
            raise NotFound({"error": "Organization not found."})

        # Send an email invitation (for simplicity, just simulating email functionality here)
        send_mail(
            subject="You're Invited!",
            message=f"You have been invited to join {organization.name}. Please sign up to accept the invitation.",
            from_email="no-reply@statuspage.com",
            recipient_list=[email],
            fail_silently=False,
        )

        return Response(
            {"message": f"Invitation sent to {email} for organization {organization.name}."},
            status=status.HTTP_200_OK,
        )

    @action(detail=False, methods=["put"], url_path="assign-role")
    @permission_classes([IsAuthenticated])  # Only authenticated users can assign roles
    def assign_role(self, request):
        """
        API to assign a role to a user in the organization.
        """
        user_id = request.data.get("user_id")
        role = request.data.get("role")

        # Validate input
        if not user_id or not role:
            raise ValidationError({"error": "User ID and role are required fields."})

        # Ensure the authenticated user is an admin of the organization
        if request.user.role != "Admin":
            raise PermissionDenied("Only admins can assign roles.")

        # Fetch the user
        try:
            user = User.objects.get(id=user_id, organization=request.user.organization)
        except User.DoesNotExist:
            raise NotFound({"error": "User not found in your organization."})

        # Assign the role
        user.role = role
        user.save()

        return Response(
            {
                "message": f"Role '{role}' assigned to user '{user.username}'.",
                "user": {"id": user.id, "username": user.username, "role": user.role},
            },
            status=status.HTTP_200_OK,
        )

    @action(detail=False, methods=["get"], url_path="list-members")
    @permission_classes([IsAuthenticated])  # Only authenticated users can view team members
    def list_members(self, request):
        """
        API to list all team members in the authenticated user's organization.
        """
        organization = request.user.organization

        if not organization:
            raise NotFound({"error": "You are not part of any organization."})

        members = User.objects.filter(organization=organization).values("id", "username", "email", "role")
        return Response(list(members), status=status.HTTP_200_OK)

    @action(detail=False, methods=["delete"], url_path="remove-user")
    @permission_classes([IsAuthenticated])  # Only admins can remove users
    def remove_user(self, request):
        """
        API to remove a user from the authenticated user's organization.
        """
        user_id = request.data.get("user_id")

        # Validate input
        if not user_id:
            raise ValidationError({"error": "User ID is required."})

        # Ensure the authenticated user is an admin of the organization
        if request.user.role != "Admin":
            raise PermissionDenied("Only admins can remove users.")

        # Fetch the user
        try:
            user = User.objects.get(id=user_id, organization=request.user.organization)
        except User.DoesNotExist:
            raise NotFound({"error": "User not found in your organization."})

        # Remove the user from the organization
        user.organization = None
        user.role = "Member"  # Reset role
        user.save()

        return Response(
            {"message": f"User '{user.username}' removed from the organization."},
            status=status.HTTP_200_OK,
        )