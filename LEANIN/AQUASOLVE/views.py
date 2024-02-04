from django.shortcuts import render

# Create your views here.
from django.shortcuts import render

def home(request):
    return render(request, 'index.html' )

def user_location(request):
    return render(request, 'user_location.html')

def camera_capture(request):
    return render(request, 'camera.html')

def community(request):
    return render(request, 'community.html')

def contacts(request):
    return render(request , 'contacts.html')

from django.shortcuts import render
import cv2
from django.http import HttpResponse


def capture_image(request):
    # Open the camera (adjust the camera index as needed)
    cap = cv2.VideoCapture(0)

    # Read a frame from the camera
    ret, frame = cap.read()

    # Save the captured image (you may want to customize the filename and path)
    image_filename = "captured_image.jpg"
    cv2.imwrite(image_filename, frame)

    # Release the camera
    cap.release()

    # Render a response with the image filename
    return HttpResponse(f"Image captured and saved as {image_filename}")

