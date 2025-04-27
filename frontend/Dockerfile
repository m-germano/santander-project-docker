FROM node:alpine

WORKDIR /app

COPY frontend/ .

RUN npm install -g http-server

CMD ["http-server", ".", "-p", "3000", "--proxy", "http://backend:5000?"]
