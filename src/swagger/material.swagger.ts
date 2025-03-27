const materialSwagger = {
  id: {
    tags: ["Materials"],
    summary: "Get material by id",
    responses: {
      "200": {
        description: "Return material by id",
      },
      "422": {
        description: "Invalid material id",
      },
      "404": {
        description: "Material not found",
      },
    },
  },
};

export default materialSwagger;
