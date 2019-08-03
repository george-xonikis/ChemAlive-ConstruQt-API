FROM continuumio/miniconda:latest

ENV LANG=C.UTF-8 LC_ALL=C.UTF-8

RUN apt-get update && apt-get upgrade -y && apt-get install -qqy \
    wget \
    bzip2 \
    libssl-dev \
    openssh-server

RUN curl -sL https://deb.nodesource.com/setup_12.x | bash - && apt-get install -y nodejs

# Start: SSH
RUN mkdir /var/run/sshd
RUN echo 'root:screencast' | chpasswd
RUN sed -i '/PermitRootLogin/c\PermitRootLogin yes' /etc/ssh/sshd_config

# SSH login fix. Otherwise user is kicked off after login
RUN sed 's@session\s*required\s*pam_loginuid.so@session optional pam_loginuid.so@g' -i /etc/pam.d/sshd

ENV NOTVISIBLE "in users profile"
RUN echo "export VISIBLE=now" >> /etc/profile
# End: SSH

RUN mkdir -p /app && \
    mkdir -p /scripts && \
    mkdir -p /media-files && \
    mkdir -p /static-files && \
    mkdir -p /frontend

COPY ./app/requirements.yml /app/requirements.yml
RUN conda env update -f /app/requirements.yml

COPY ./app /app

COPY ./scripts /scripts
RUN chmod +x /scripts/*

COPY ./frontend /frontend

WORKDIR /frontend

RUN npm install && npm run build

WORKDIR /app

EXPOSE 8000
EXPOSE 22