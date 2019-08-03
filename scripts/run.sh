#!/bin/bash
rm -rf /frontend-build/*
cp -r /frontend/build/* /frontend-build

python manage.py makemigrations
python manage.py migrate

python manage.py collectstatic --noinput
/opt/conda/bin/gunicorn --bind 0.0.0.0:8000 app.wsgi
