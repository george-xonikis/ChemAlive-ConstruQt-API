# ChemAlive Project

#### Tools:

- Python Django
- React
- Docker
- GitLab CI/CD
- Digital Ocean deployment

## 1. Initial Setup

#### 1. Create repo and clone it

#### 2. Create project's structure

    ChemALive
        [app]
        [frontend]
            [public]
            [src]
            ...
        [media-files]
        [static-files]
        [scripts]
            lint.sh
            run.sh
        docker-compose.yml
        Dockerfile
        .gitignore

#### 3. Create Django project. In project directory

    django-admin startproject app

#### 4. Create requirements.yml

#### 5. Create Dockerfile and build the image

    docker build -t registry.gitlab.propulsion-home.ch/full-stack/batch-05-2019/personal-projects/chemalive:latest .

#### 6. Spin up the containers with docker-compose.yml

    docker-compose up -d

#### 7. Access the containers

    docker exec -ti container_name bash

#### 8. On Django settings change to Postgres

    DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql_psycopg2",
        "NAME": os.environ.get("POSTGRES_DB"),
        "USER": os.environ.get("POSTGRES_USER"),
        "PASSWORD": os.environ.get("POSTGRES_PASSWORD"),
        "HOST": os.environ.get("POSTGRES_HOST"),
        "PORT": os.environ.get("POSTGRES_PORT"),
        }
    }

#### and run migrations

    python manage.py migrate
    python manage.py makemigrations

#### 9. Create admin user

    python manage.py createsuperuser

#### 10. Run server

    python manage.py runserver 0.0.0.0:8000

#### 11. Check postgres tables

    docker exec -ti postgres_container bash
    su postgres
    psql
    \dt

#### Django Admin page

    http://localhost:8000/admin

## 2. Server Setup

## 3. React Setup

#### 1. If you have already some react packages

    npm install

#### 2. Install packages

    npm i react
    npm i redux
    npm i redux-thunk
    npm i react-dom
    npm i react-router-dom
    npm i react-scripts
    npm i react-redux
    npm i axios
    npm i styled-components

#### 3. Project structure

    src
        assets
        components
        HOC
        store

##### Kill react server

    lsof -i :3000
    kill -9 <PID>
