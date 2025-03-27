const weaponSwagger = {
  all: {
    tags: ["Weapons"],
    summary: "Get all weapons",
    responses: {
      "200": {
        description: "Return all weapons",
      },
    },
  },

  series: {
    tags: ["Weapons"],
    summary: "Get all weapon series",
    responses: {
      "200": {
        description: "Return all weapon series",
      },
    },
  },

  id: {
    tags: ["Weapons"],
    summary: "Get weapon by id",
    responses: {
      "200": {
        description: "Return weapon by id",
      },

      "422": {
        description: "Invalid weapon id",
      },
      "404": {
        description: "Weapon not found",
      },
    },
  },
};

export default weaponSwagger;
