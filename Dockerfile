FROM node:17-alpine AS builder

WORKDIR /app

COPY ./package.json /app/package.json

COPY ./package-lock.json /app/package-lock.json

RUN npm install

COPY ./ /app

RUN npx prisma generate

RUN npm run build

FROM node:17-alpine AS final

WORKDIR /app

ENV NODE_ENV=production

RUN apk add --no-cache tini

COPY package*.json /app/

RUN npm install --only=production

RUN npx prisma db push

COPY --from=builder /app/node_modules/@generated /app/node_modules/@generated

COPY --from=builder /app/dist /app/dist

COPY --from=builder /app/ /app/dist

ENTRYPOINT [ "node", "/app/dist/src/index.js" ]
