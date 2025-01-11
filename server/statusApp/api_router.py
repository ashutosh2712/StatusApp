from rest_framework.routers import DefaultRouter,SimpleRouter
from django.conf import settings
from api.views import (
   UserViewSet,
   OrganizationViewSet,
   ServiceViewSet,
   IncidentViewSet,
   MaintenanceViewSet,
   StatusPageViewSet
)

if settings.DEBUG:
    router = DefaultRouter()
else:
    router = SimpleRouter()
    

router.register('users', UserViewSet, basename='users')

router.register('orgs', OrganizationViewSet, basename='orgs')

router.register('service', ServiceViewSet, basename='service')

router.register('incident', IncidentViewSet, basename='incident')

router.register('maintenance', MaintenanceViewSet, basename='maintenance')

router.register('status', StatusPageViewSet, basename='status')


app_name = 'api'
urlpatterns = router.urls