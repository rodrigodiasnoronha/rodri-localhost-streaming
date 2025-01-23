ARG NODE_VERSION=20.18.2
FROM node:${NODE_VERSION}-alpine AS node

COPY . .

RUN npm install

EXPOSE 3000

CMD ["npm", "run", "start:dev"]
