FROM node:21.2-alpine3.18

WORKDIR /app

COPY package*.json ./

RUN npm install --legacy-peer-deps

RUN npm install -g @angular/cli

COPY . .

# RUN ng build

EXPOSE 4200

CMD ["ng", "serve", "--host", "0.0.0.0"]
