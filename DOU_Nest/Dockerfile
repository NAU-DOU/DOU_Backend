# build
FROM node:18-alpine AS builder

COPY ./package*.json /nestfolder/
COPY ./yarn.lock /nestfolder/
WORKDIR /nestfolder/
RUN yarn install

COPY . /nestfolder/

RUN yarn build

RUN npm prune --production

# prod stage
FROM node:18-alpine
WORKDIR /nestfolder/
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

COPY --from=builder /nestfolder/dist ./dist
COPY --from=builder /nestfolder/node_modules ./node_modules
COPY package*.json ./
COPY ./yarn.lock ./

RUN yarn install --production

EXPOSE 3000

CMD [ "yarn", "start:prod" ]