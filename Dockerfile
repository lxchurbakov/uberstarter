FROM node:alpine
WORKDIR /app

ENV PORT=9000

# Запускать из папки 05-beauty

RUN apk add --update python3 make g++ && rm -rf /var/cache/apk/*

COPY package-lock.json ./package-lock.json
COPY package.json ./package.json
COPY tsconfig.json ./tsconfig.json

RUN npm install

COPY frm ./frm
COPY lib ./lib
# COPY migrations ./migrations
COPY src ./src
# COPY .env.deploy ./.env
# COPY knexfile.js ./knexfile.js

RUN npm run build

CMD ["npm", "start"]
