FROM oven/bun AS build

WORKDIR /app

# Cache packages installation
COPY package.json package.json
COPY bun.lock bun.lock

RUN bun install

COPY ./src ./src

# Ensure required directories exist
RUN mkdir -p ./src/data/enka-cache

ENV NODE_ENV=production

RUN bun build \
    --compile \
    --minify-whitespace \
    --minify-syntax \
    --target bun \
    --outfile server \
    ./src/index.ts

FROM gcr.io/distroless/base

WORKDIR /app

COPY --from=build /app/server server

# create directories for cache
RUN mkdir -p /app/src/data/enka-cache/data

# Default to 5500 if PORT is not provided
ENV PORT=5500
ENV NODE_ENV=production

CMD ["./server"]

EXPOSE ${PORT}