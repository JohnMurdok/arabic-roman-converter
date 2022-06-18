FROM node:16

WORKDIR /var/www
ADD './' ./
RUN npm i && npx lerna bootstrap

ENTRYPOINT ["npm", "start"]
