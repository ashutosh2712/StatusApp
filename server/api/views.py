from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework import viewsets, status
from django.contrib.auth import get_user_model
from rest_framework.exceptions import NotFound, ValidationError
from rest_framework.authtoken.models import Token
User = get_user_model()


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

        # Validation
        if not username or not email or not password:
            raise ValidationError({"error": "Username, email, and password are required fields."})

        # Create a new user
        user = User.objects.create_user(username=username, email=email, password=password, is_admin=is_admin)
        user.save()

        # Create a token for the user
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
