FROM mhart/alpine-node:14.17 as builder

WORKDIR /app

COPY . .
RUN apk add --no-cache tini
RUN yarn install --production
RUN yarn build
RUN rm -rf test
RUN rm -rf deploy

ENTRYPOINT ["/sbin/tini", "--"]
CMD yarn vault && yarn migrate && yarn start-prod
