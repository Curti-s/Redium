# base image
FROM node:8.16.0-alpine

# working dir
WORKDIR /frontend

# 
ENV PATH /frontend/node_modules/.bin:$PATH

# copy package.json
COPY package.json /frontend

# copy the current directory contents into the container
COPY . /frontend/

# install depenencies
RUN yarn install

# install server
RUN yarn global add serve 

# build
RUN yarn run build

# expose a port
EXPOSE 5000

# run the frontend
CMD ["serve", "-s","build"]