#install python
FROM python:3.7-slim
RUN mkdir /code
WORKDIR /code/src
COPY ./requirements.txt /code/src
RUN pip install -r requirements.txt
COPY . /code/src