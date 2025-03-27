const systemSwagger = {
  home: {
    tags: ["System"],
    summary: "Welcome message",
    responses: {
      200: {
        description: "Welcome message for the API",
      },
    },
  },

  health: {
    tags: ["System"],
    summary: "Health check",
    responses: {
      200: {
        description: "Server is running",
      },
    },
  },

  serverVersion: {
    tags: ["System"],
    summary: "Get server version",
    responses: {
      200: {
        description: "Returns the current version of the server",
      },
    },
  },

  gameVersion: {
    tags: ["System"],
    summary: "Get game version",
    responses: {
      200: {
        description: "Returns the current version of the game",
      },
    },
  },
};

export default systemSwagger;
