# pull official base image
FROM node:13.12.0-alpine

WORKDIR /code/web

COPY package*.json ./

RUN npm install react-bootstrap bootstrap mdbreact event-emitter styled-components recharts --silent --save

RUN npm add --also=dev --exact --silent prettier
RUN npm add --also=dev --silent eslint-plugin-prettier

EXPOSE 3000

CMD ["npm", "start"]
