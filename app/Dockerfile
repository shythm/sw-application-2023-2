# build frontend
FROM node:16 AS builder
WORKDIR /frontend

COPY ./hdd-relver-system/package.json package.json
COPY ./hdd-relver-system/package-lock.json package-lock.json
RUN npm install

COPY ./hdd-relver-system ./
RUN npm run build

# build static server
FROM nginx:1.25 AS product
WORKDIR /app
COPY --from=builder /frontend/build /usr/share/nginx/html
