import os

from django.core.files.storage import default_storage
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet

from image_detection.settings import BASE_DIR

MEDIA_ROOT = os.path.join(BASE_DIR, 'api/media/')


class ImageProcessingView(GenericViewSet):
    def get(self, request):
        return Response("ok")

    def monet2photo(self, request):
        file_obj = request.FILES['file']
        with default_storage.open(MEDIA_ROOT + file_obj.name, 'wb+') as destination:
            for chunk in file_obj.chunks():
                destination.write(chunk)
        return Response("ok")
