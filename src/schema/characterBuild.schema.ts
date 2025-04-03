import { t } from "elysia";

const createCharacterBuildValidation = {
  body: t.Object({
    buildName: t.String({ error: "Invalid build name" }),
    lastUpdate: t.String({ error: "Invalid last update" }),
    characterId: t.String({ error: "Invalid character id" }),
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
  })
};

export { createCharacterBuildValidation };
