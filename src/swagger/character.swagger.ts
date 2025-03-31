const characterSwagger = {
  all: {
    tags: ["Characters"],
    summary: "Get all characters",
    responses: {
      "200": {
        description: "Return all characters"
      }
    }
  },

  locations: {
    tags: ["Characters"],
    summary: "Get all character locations",
    responses: {
      "200": {
        description: "Return all character locations"
      }
    }
  },

  id: {
    tags: ["Characters"],
    summary: "Get character by id",
    description: "Get character details by its id",
    responses: {
      "200": {
        description: "Return character by id"
      },

      "422": {
        description: "Invalid character id or skill depot id"
      },
      "404": {
        description: "Either character id or skill depot not found"
      }
    }
  }
};

export default characterSwagger;
