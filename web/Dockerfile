# pull official base image
FROM node:13.12.0-alpine

WORKDIR /code/web

COPY package*.json ./

RUN npm install react-bootstrap bootstrap mdbreact event-emitter styled-components @appbaseio/reactivesearch --silent --save

EXPOSE 3000

CMD ["npm", "start"]
