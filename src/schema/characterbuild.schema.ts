import { number, object, string, type TypeOf } from "zod";

const params = object({
  id: string({
    required_error: "Character Build ID is required",
    invalid_type_error: "Character Build ID must be a string"
  })
});

const body = object({
  characterId: string({
    required_error: "Character ID is required",
    invalid_type_error: "Character ID must be a string"
  }),
  buildName: string({
    required_error: "Build Name is required",
    invalid_type_error: "Build Name must be a string"
  }),
  lastUpdatedPatch: string({
    required_error: "Last Updated Patch is required",
    invalid_type_error: "Last Updated Patch must be a string"
  }),
  mainStats: object({
    sands: string().array(),
    goblet: string().array(),
    circlet: string().array()
  }).refine(
    (data) =>
      data.sands.length > 0 &&
      data.goblet.length > 0 &&
      data.circlet.length > 0,
    {
      message:
        "Each of 'sands', 'goblet', and 'circlet' must have at least one value."
    }
  ),
  subStats: string()
    .array()
    .refine((data) => data.length > 0, {
      message: "SubStats must have at least one value."
    }),
  talentPriority: object({
    normalAttack: number({
      required_error: "Normal Attack is required",
      invalid_type_error: "Normal Attack must be a number"
    }),
    elementalSkill: number({
      required_error: "Elemental Skill is required",
      invalid_type_error: "Elemental Skill must be a number"
    }),
    elementalBurst: number({
      required_error: "Elemental Burst is required",
      invalid_type_error: "Elemental Burst must be a number"
    })
  }),
  notes: string().optional(),
  artifactNotes: string({
    invalid_type_error: "Artifact Notes must be a string"
  }).optional(),
  statNotes: string({
    invalid_type_error: "Stat Notes must be a string"
  }).optional(),
  talentNotes: string({
    invalid_type_error: "Talent Notes must be a string"
  }).optional(),
  weaponNotes: string({
    invalid_type_error: "Weapon Notes must be a string"
  }).optional(),
  weapons: object({
    weaponId: number({
      required_error: "Weapon ID is required",
      invalid_type_error: "Weapon ID must be a number"
    }),
    weaponRank: number({
      required_error: "Weapon Rank is required",
      invalid_type_error: "Weapon Rank must be a number"
    }),
    weaponRefinement: number({
      required_error: "Weapon Refinement is required",
      invalid_type_error: "Weapon Refinement must be a number"
    })
  }).array(),
  artifacts: object({
    rank: number({
      required_error: "Artifact Rank is required",
      invalid_type_error: "Artifact Rank must be a number"
    }),
    artifactSets: object({
      setId: string({
        required_error: "Artifact Set ID is required",
        invalid_type_error: "Artifact Set ID must be a string"
      }),
      piecesCount: number({
        required_error: "Artifact Pieces Count is required",
        invalid_type_error: "Artifact Pieces Count must be a number"
      })
    }).array()
  }).array()
});

const getCharacterBuildByIdSchema = {
  params
};

const createNewCharacterBuildSchema = {
  body
};

type GetCharacterBuildByIdInput = TypeOf<typeof params>;
type CreateNewCharacterBuildInput = TypeOf<typeof body>;

export {
  getCharacterBuildByIdSchema,
  type GetCharacterBuildByIdInput,
  createNewCharacterBuildSchema,
  type CreateNewCharacterBuildInput
};
