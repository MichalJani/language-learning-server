FROM node:12
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn install
# RUN yarn install --frozen-lockfile --only=production
COPY . .
# COPY src ./src
# CMD ["node", "src/server.js"]


RUN yarn build
EXPOSE 8080
CMD [ "node", "dist/server.js" ]
