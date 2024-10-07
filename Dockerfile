# specify the node base image with your desired version node:<version>
FROM oven/bun:1
# copy all files in the current directory to a new directory called /app inside of the container
COPY . /app
WORKDIR /app
# install dependencies defined in package.json using npm
RUN bun i
RUN bunx playwright install
RUN bunx playwright install-deps
# start the app by running the start script, which is specified as an argument when we build this image
CMD ["bun", "start"]
