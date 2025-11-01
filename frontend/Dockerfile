
FROM node:22-alpine


WORKDIR /frontend


COPY package*.json ./

RUN rm -rf node_modules package-lock.json && npm cache clean --force




RUN npm install


COPY . .


EXPOSE 5173


CMD ["npm", "run", "dev", "--", "--host"]
