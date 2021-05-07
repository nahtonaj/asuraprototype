# pull official base image
FROM node:14.8.0

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY yarn.lock ./
RUN yarn install --pure-lockfile
RUN yarn global add expo-cli

# add app
COPY . ./

EXPOSE 3000 19000 19001 19002 19003 19004 19005 19006

# start app
CMD ["yarn", "web", "--lan"]