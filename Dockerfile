FROM node:18-alpine
LABEL MAINTAINER="ben.quek@ben-labs.net"
WORKDIR  /app
COPY ./ ./
RUN npm ci --production \
&& npm i tsx \
&& npm run build
EXPOSE 5000
EXPOSE 443
RUN chown -R node:node /app
USER node
CMD ["node", "/app/dist/server.js"]