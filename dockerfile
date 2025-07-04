FROM node:20-slim AS builder

WORKDIR /app

RUN apt-get update && apt-get install -y openssl

COPY package*.json ./
RUN npm install

COPY prisma ./prisma
RUN npx prisma generate

ARG NEXTAUTH_SECRET
ENV NEXTAUTH_SECRET=$NEXTAUTH_SECRET

COPY . .
RUN npm run build

FROM node:20-slim

WORKDIR /app

RUN npm install -g pm2

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/ecosystem.config.js ./ecosystem.config.js
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/prisma ./prisma

EXPOSE 3000

CMD [ "pm2", "start", "ecosystem.config.js" ]