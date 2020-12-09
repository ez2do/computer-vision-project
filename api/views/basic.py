import os

from django.core.files.storage import default_storage
from django.http import HttpResponse
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet

from image_detection.settings import BASE_DIR
from inference import pretrained_model_predict

SRC_MEDIA_ROOT = os.path.join(BASE_DIR, 'api/media/source/')
MONET_MEDIA_ROOT = os.path.join(BASE_DIR, 'api/media/monet/')
PRE_TRAINED_FILE = os.path.join(BASE_DIR, 'pretrained_weights/cyclegan_checkpoints.100')


class ImageProcessingView(GenericViewSet):
    def get(self, request):
        return Response("ok")

    def monet2photo(self, request):
        file_obj = request.FILES['file']

        src_path = SRC_MEDIA_ROOT + file_obj.name
        dst_path = MONET_MEDIA_ROOT + file_obj.name

        with default_storage.open(src_path, 'wb+') as destination:
            for chunk in file_obj.chunks():
                destination.write(chunk)

        with open(src_path, "rb") as fh:
            response = HttpResponse(fh.read(), content_type="application/octet-stream")
            response['Content-Disposition'] = 'attachment; filename={}_monet.docx'.format(file_obj.name)
            return response

        return Response(status=500)
        # pretrained_model_predict(PRE_TRAINED_FILE, src_path, dst_path)
        # return Response("ok")
