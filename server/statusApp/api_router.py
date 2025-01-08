from rest_framework.routers import DefaultRouter,SimpleRouter
from django.conf import settings
from api.views import (
   UserViewSet
)

if settings.DEBUG:
    router = DefaultRouter()
else:
    router = SimpleRouter()
    

router.register('users', UserViewSet, basename='users')

app_name = 'api'
urlpatterns = router.urls