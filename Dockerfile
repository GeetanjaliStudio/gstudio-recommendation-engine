# take default image of node boron i.e  node 6.x
FROM node:10.8.0

MAINTAINER Andrew Lloyd <andrew85.lloyd@gmail.com>

# create app directory in container
RUN mkdir -p /app

# set /app directory as default working directory
WORKDIR /app

# only copy package.json initially so that `RUN npm install` layer is recreated only
# if there are changes in package.json
ADD package.json package-lock.json /app/

# --no-save: Don’t generate a package-lock.json lockfile
RUN npm install --no-save

# copy all file from current dir to /app in container
COPY . /app/

# cmd to start service
CMD [ "npm", "start" ]
