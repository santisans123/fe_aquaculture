FROM node:14
WORKDIR /usr/src/app
COPY package.json ./
RUN npm install -f
COPY . .
CMD [ "npm", "start" ]
