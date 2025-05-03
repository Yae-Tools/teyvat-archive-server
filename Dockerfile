FROM oven/bun:latest AS build

WORKDIR /app

# Cache packages installation
COPY package.json package.json
COPY bun.lock bun.lock

RUN bun install

# Copy the entire src directory
COPY ./src ./src

ENV NODE_ENV=production

RUN bun build \
    --compile \
    --minify-whitespace \
    --minify-syntax \
    --target bun \
    --outfile server \
    ./src/index.ts

# Pre-create the directories needed by the application
RUN mkdir -p ./empty-dirs/src/data/enka-cache

# Use the full Bun image as the runtime, since it has everything needed
FROM oven/bun:latest

WORKDIR /app

# Copy the compiled server binary
COPY --from=build /app/server server

# Copy the empty directory structure
COPY --from=build /app/empty-dirs/src /app/src

# Make directories writable
RUN chmod -R 777 /app/src/data/enka-cache

# Default to 5500 if PORT is not provided
ENV PORT=5500
ENV NODE_ENV=production

CMD ["./server"]

EXPOSE ${PORT}