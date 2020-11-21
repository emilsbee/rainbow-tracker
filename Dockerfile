# Multi-stage
# 1) Node image for building frontend assets
# 2) nginx stage to serve frontend assets

# Name the node stage "builder"
FROM node:10 AS builder
# Set working directory
WORKDIR /app
# Copy all files from current directory to working dir in image
COPY . .

ARG REACT_APP_API_KEY_ARG
ENV REACT_APP_API_KEY=$REACT_APP_API_KEY_ARG

ARG REACT_APP_AUTH_DOMAIN_ARG
ENV REACT_APP_AUTH_DOMAIN=$REACT_APP_AUTH_DOMAIN_ARG

ARG REACT_APP_DATABASE_URL_ARG
ENV REACT_APP_DATABASE_URL=$REACT_APP_DATABASE_URL_ARG

ARG REACT_APP_PROJECT_ID_ARG
ENV REACT_APP_PROJECT_ID=$REACT_APP_PROJECT_ID_ARG

ARG REACT_APP_STORAGE_BUCKET_ARG
ENV REACT_APP_STORAGE_BUCKET=$REACT_APP_STORAGE_BUCKET_ARG

ARG REACT_APP_MESSAGING_SENDER_ID_ARG
ENV REACT_APP_MESSAGING_SENDER_ID=$REACT_APP_MESSAGING_SENDER_ID_ARG

ARG REACT_APP_APP_ID_ARG
ENV REACT_APP_APP_ID=$REACT_APP_APP_ID_ARG

ARG REACT_APP_MEASUREMENT_ID_ARG
ENV REACT_APP_MEASUREMENT_ID=$REACT_APP_MEASUREMENT_ID_ARG

# install node modules and build assets
RUN yarn install && yarn build

# nginx state for serving content
FROM nginx:alpine
# Set working directory to nginx asset directory
WORKDIR /usr/share/nginx/html
# Remove default nginx static assets
RUN rm -rf ./*
# Copy static assets from builder stage
COPY --from=builder /app/build .

 
# Containers run nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"]