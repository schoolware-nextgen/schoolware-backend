# specify the node base image with your desired version node:<version>
FROM node:21
# copy all files in the current directory to a new directory called /app inside of the container
COPY . /app
WORKDIR /app
# install dependencies defined in package.json using npm
RUN npm ci --only=production
RUN npx playwright install-deps
# start the app by running the start script, which is specified as an argument when we build this image
CMD ["npm", "start"]
