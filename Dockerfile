FROM node:20 AS build
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY ./nginx /etc/nginx/conf.d
EXPOSE 3005
CMD ["nginx", "-g", "daemon off;"]