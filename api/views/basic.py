import os

from django.core.files.storage import default_storage
from django.http import HttpResponse
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet

from image_detection.settings import BASE_DIR
from inference import pretrained_model_predict

SRC_MEDIA_ROOT = os.path.join(BASE_DIR, 'api/media/source/')

MONET_MEDIA_ROOT = os.path.join(BASE_DIR, 'api/media/monet/')
SUMMER_MEDIA_ROOT = os.path.join(BASE_DIR, 'api/media/summer/')
WINTER_MEDIA_ROOT = os.path.join(BASE_DIR, 'api/media/winter/')

PRE_TRAINED_MONET = os.path.join(BASE_DIR, 'pretrained_weights/cyclegan_monet2photo_checkpoints.100')
PRE_TRAINED_SUMMER = os.path.join(BASE_DIR, 'pretrained_weights/cyclegan_summer2winter_checkpoints.040')

CONVERT_MAP = {
    'monet': {
        'destination_path': MONET_MEDIA_ROOT,
        'pre_trained_path': PRE_TRAINED_MONET
    },
    'summer': {
        'destination_path': SUMMER_MEDIA_ROOT,
        'pre_trained_path': PRE_TRAINED_SUMMER
    },
    'winter': {
        'destination_path': '',
        'pre_trained_path': ''
    }
}


class ImageProcessingView(GenericViewSet):
    def get(self, request):
        return Response("ok")

    def convert(self, request):
        try:
            file_obj = request.FILES['file']

            to_type = request.query_params.get('to')
            converter = CONVERT_MAP.get(to_type)
            if converter is None:
                return Response(status=400, data={
                    "error": "convert type not supported"
                })

            src_path = SRC_MEDIA_ROOT + file_obj.name
            dst_path = converter['destination_path'] + file_obj.name

            with default_storage.open(src_path, 'wb+') as destination:
                for chunk in file_obj.chunks():
                    destination.write(chunk)

            pretrained_model_predict(converter['pre_trained_path'], src_path, dst_path)

            with open(dst_path, "rb") as fh:
                response = HttpResponse(fh.read(), content_type="application/octet-stream")
                response['Content-Disposition'] = 'attachment; filename={}_monet.docx'.format(file_obj.name)
                return response

        except Exception as e:
            print(e)
            return Response(status=500, data={
                "error": e.__str__()
            })
