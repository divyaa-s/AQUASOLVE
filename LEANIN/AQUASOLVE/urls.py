from django.urls import path
from .views import user_location, camera_capture, home, community, contacts

urlpatterns = [
    path('index/', home, name='index'),
    path('map/', user_location, name='user_location'),
    path('camera/', camera_capture, name='camera'),  # Add this line
    path('community/', community, name='community'),
    path('contacts/', contacts, name='contacts'),
    #path('test/', user_location, name='user_location'),
    #path('submit/', submit_form, name='submit_form'),



]

