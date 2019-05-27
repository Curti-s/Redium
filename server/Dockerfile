# base image
FROM node:8.16.0-alpine

# working dir
WORKDIR /server

# copy package.json
COPY package.json /server

# install depenencies
RUN yarn install

# copy the current directory contents into the container
COPY . /server/

# expose a port
EXPOSE 9000

# run the server
CMD ['yarn', 'start']