FROM node:18-alpine

COPY ./package*.json /nestfolder/
COPY ./yarn.lock /nestfolder/
WORKDIR /nestfolder/
RUN yarn install

COPY . /nestfolder/

RUN yarn build

CMD [ "yarn", "start:prod" ]