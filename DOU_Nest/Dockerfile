# build
FROM node:18-alpine

COPY ./package*.json /nestfolder/
COPY ./yarn.lock /nestfolder/
WORKDIR /nestfolder/
RUN yarn install

COPY . /nestfolder/

RUN yarn build

# prod stage
FROM node:18-alpine
WORKDIR /nestfolder/
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

COPY --from=build /nestfolder/dist ./dist
COPY package*.json ./
COPY ./yarn.lock ./

RUN yarn install --production

EXPOSE 3000

CMD [ "yarn", "start:prod" ]