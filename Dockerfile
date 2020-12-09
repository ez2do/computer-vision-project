FROM python:3.7

WORKDIR /app

RUN pip install --upgrade pip

COPY requirements.txt /app

RUN pip install -r requirements.txt

EXPOSE 8000

COPY . /app

CMD gunicorn -b 0.0.0.0:8000 --timeout 300 image_detection.wsgi:application