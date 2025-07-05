FROM node:20-slim
WORKDIR /app

# Install runtime dependencies
RUN apt-get update && apt-get install -y curl openssl && \
    npm install -g pm2 && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

COPY package*.json .

RUN npm install 

COPY .env .env

COPY prisma ./prisma

RUN npx prisma migrate deploy

RUN npx prisma generate

COPY . .

RUN npm run build 

EXPOSE 3000

CMD ["pm2-runtime", "npm", "--", "start"]