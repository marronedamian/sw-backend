FROM node:20.11.1

WORKDIR /app

COPY . .

RUN npm cache clean --force && rm -rf node_modules && npm install

EXPOSE 3021

CMD ["sh", "-c", "npm run build && npm run start:dev"]

