# base image
FROM node:8.16.0-alpine

# working dir
WORKDIR /frontend

# copy package.json
COPY package.json /frontend

# install depenencies
RUN yarn install

# copy the current directory contents into the container
COPY . /frontend/

# expose a port
EXPOSE 3000

# run the frontend
CMD ['yarn', 'start']