FROM node:20-slim
WORKDIR /app

# Install runtime dependencies
RUN apt-get update && apt-get install -y openssl && \
    npm install -g pm2 && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

COPY package*.json .

RUN npm install 

COPY prisma ./prisma

RUN npx prisma generate

COPY . .

ARG NEXTAUTH=NEXT_AUTH_SECRET
ENV NEXT_AUTH_SECRET=${NEXTAUTH}


RUN npm run build 

EXPOSE 3000

CMD ["pm2-runtime", "npm", "--", "start"]