FROM node:10.15.1-alpine

RUN mkdir -p /srv/app/application
COPY . /srv/app/application
WORKDIR /srv/app/application


RUN npm i -g yarn --unsafe-perm=true
RUN yarn

CMD ["npm", "start"]
