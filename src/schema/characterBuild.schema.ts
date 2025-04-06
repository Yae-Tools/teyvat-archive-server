import { t } from "elysia";

const createCharacterBuildValidation = t.Object({
  buildName: t
    .Transform(t.String())
    .Decode((value) => {
      if (value === undefined || value === null)
        throw new Error("Build name is required");
      if (value === "") throw new Error("Build name cannot be empty");
      if (typeof value !== "string")
        throw new Error("Build name must be a string");
      if (value.length > 50)
        throw new Error("Build name must not exceed 50 characters");
      return value;
    })
    .Encode((value) => value),
  lastUpdate: t
    .Transform(t.String())
    .Decode((value) => {
      if (value === undefined || value === null)
        throw new Error("Last update is required");
      if (value === "") throw new Error("Last update cannot be empty");
      if (typeof value !== "string")
        throw new Error("Last update must be a string");
      return value;
    })
    .Encode((value) => value),
  characterId: t
    .Transform(t.String())
    .Decode((value) => {
      if (value === undefined || value === null)
        throw new Error("Character id is required");
      if (value === "") throw new Error("Character id cannot be empty");
      if (typeof value !== "string")
        throw new Error("Character id must be a string");
      return value;
    }
  ).Encode((value) => value),
  weapons: t.Array(
    t.Object({
      weaponId: t.String({ error: "Invalid weapon id" }),
      weaponName: t.String({ error: "Invalid weapon name" }),
      weaponIcon: t.String({ error: "Invalid weapon icon" }),
      refinement: t.Union([t.Number(), t.Null()]),
      rank: t.Number({ error: "Invalid rank" })
    })
  ),
  artifacts: t.Array(
    t.Object({
      mainArtifactSetId: t.String({ error: "Invalid main artifact set id" }),
      secondaryArtifactSets: t.Optional(
        t.Array(
          t.Object({
            artifactSetIds: t.Array(
              t.String({ error: "Invalid artifact set id" })
            ),
            artifactSetName: t.String({ error: "Invalid artifact set name" })
          })
        )
      ),
      rank: t.Number({ error: "Invalid rank" })
    })
  ),
  mainStats: t.Object({
    sands: t.Array(t.String({ error: "Invalid sands" })),
    goblet: t.Array(t.String({ error: "Invalid goblet" })),
    circlet: t.Array(t.String({ error: "Invalid circlet" })),
    notes: t.Optional(t.String({ error: "Invalid notes" }))
  }),
  subStats: t.Object({
    stats: t.Array(t.String({ error: "Invalid stats" })),
    notes: t.Optional(t.String({ error: "Invalid notes" }))
  }),
  talentPriority: t.Object({
    normalAttack: t.Number({ error: "Invalid normal attack" }),
    elementalSkill: t.Number({ error: "Invalid elemental skill" }),
    elementalBurst: t.Number({ error: "Invalid elemental burst" }),
    notes: t.Optional(t.String({ error: "Invalid notes" }))
  }),
  notes: t.Optional(t.String({ error: "Invalid notes" }))
});

export { createCharacterBuildValidation };
