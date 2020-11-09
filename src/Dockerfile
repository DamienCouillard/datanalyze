#install python
FROM python:3.7-slim
RUN mkdir /code
WORKDIR /code/
RUN ls
COPY ./requirements.txt /code/
RUN pip install -r requirements.txt
COPY . /code/