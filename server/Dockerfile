# base image
FROM node:8.16.0-alpine

# working dir
WORKDIR /server

# 
ENV PATH /server/node_modules/.bin:$PATH

# copy package.json
COPY package.json /server/

# copy the current directory contents into the container
COPY . /server/

# install depenencies
RUN yarn install


# expose a port
EXPOSE 9000

# run the server
CMD ["yarn", "start"]