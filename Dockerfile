FROM node:21-alpine3.17 as compile-image

RUN mkdir /opt/ng 
WORKDIR /opt/ng
COPY ./src ./src
COPY ./amplify ./package*.json ./tsconfig*.json /angular.json ./
COPY ./conf.d ./
RUN npm install
RUN npm install -g @angular/cli@15.2.6
# # building angular
RUN ng build

# IMAGE 2: setting up the webserver
FROM nginx:latest

RUN ln -sf /dev/stdout /var/log/nginx/access.log \
    && ln -sf /dev/stderr /var/log/nginx/error.log

COPY --from=compile-image /opt/ng/dist/cognito-ang-mock /usr/share/nginx/html
COPY --from=compile-image /opt/ng/default.conf /etc/nginx/conf.d

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]