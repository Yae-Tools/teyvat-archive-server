const artifactSwagger = {
  all: {
    tags: ["Artifacts"],
    summary: "Get all artifacts",
    description:
      "This will return all artifacts with basic information in the enka system",
    responses: {
      "200": {
        description: "Return all artifacts"
      }
    }
  },

  sets: {
    tags: ["Artifacts"],
    summary: "Get all artifact sets",
    description:
      "This will return all artifact sets with basic information in the enka system",
    responses: {
      "200": {
        description: "Return all artifact sets"
      }
    }
  },

  id: {
    tags: ["Artifacts"],
    summary: "Get artifact set by id",
    description:
      "This will return artifact set by id with all information including individual artifacts related to the set in the enka system",
    responses: {
      "200": {
        description: "Return artifact set by id"
      },

      "422": {
        description: "Invalid artifact set id"
      },
      "404": {
        description: "Artifact set not found"
      }
    }
  }
};

export default artifactSwagger;
