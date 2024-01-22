FROM node:21-alpine3.17 as compile-image

RUN mkdir /opt/ng 
WORKDIR /opt/ng
COPY ./src ./src
COPY ./amplify ./package*.json ./tsconfig*.json /angular.json ./
COPY ./conf.d ./

RUN --mount=type=secret,id=EXPORTS \
     EXPORTS=$(cat /run/secrets/EXPORTS) \
     && echo $EXPORTS > ./src/aws-exports.js \
     && npm ci \
     && npm install -g @angular/cli@17.0.5 \
     && npm install -g @aws-amplify/cli \ 
     && ng build


FROM nginx:latest

RUN ln -sf /dev/stdout /var/log/nginx/access.log \
    && ln -sf /dev/stderr /var/log/nginx/error.log

COPY --from=compile-image /opt/ng/dist/cognito-ang-mock /usr/share/nginx/html
COPY --from=compile-image /opt/ng/default.conf /etc/nginx/conf.d

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]