# pull official base image
FROM node:13.12.0-alpine

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

RUN chown -R /user/local/app/ 

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN yarn install

# add app
COPY . ./

# start app
CMD ["yarn", "start"]