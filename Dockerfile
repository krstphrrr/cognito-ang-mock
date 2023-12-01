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
    # cat /run/secrets/EXPORTS
# RUN echo ${EXPORTS}

# RUN EXPORTS=$(cat /run/secrets/EXPORTS)
# RUN echo $EXPORTS > ./src/aws-exports.js
# CMD ["tail", "-f", "/dev/null"]
# RUN npm ci
# RUN npm install -g @angular/cli@17.0.5
# RUN npm install -g @aws-amplify/cli
# # building angular
# RUN ng build

# IMAGE 2: setting up the webserver
FROM nginx:latest

RUN ln -sf /dev/stdout /var/log/nginx/access.log \
    && ln -sf /dev/stderr /var/log/nginx/error.log

COPY --from=compile-image /opt/ng/dist/cognito-ang-mock /usr/share/nginx/html
COPY --from=compile-image /opt/ng/default.conf /etc/nginx/conf.d

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]