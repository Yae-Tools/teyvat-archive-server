import mongoose from "mongoose";
import { customAlphabet } from "nanoid";
import { ICharacterBuildInput } from "../types/characterBuild.types";

const Schema = mongoose.Schema;

const nanoid = customAlphabet("1234567890abcdef", 10);

const characterBuildSchema = new Schema({
  buildId: {
    type: String,
    default: () => nanoid(),
    unique: true
  },
  buildName: {
    type: String,
    required: true
  },
  lastUpdate: {
    type: String,
    required: true
  },
  characterId: {
    type: String,
    required: true
  },
  weapons: [
    {
      weaponId: {
        type: String,
        required: true
      },
      weaponName: {
        type: String,
        required: true
      },
      weaponIcon: {
        type: String,
        required: true
      },
      refinement: {
        type: Number,
        default: null
      },
      rank: {
        type: Number,
        required: true
      }
    }
  ],
  artifacts: [
    {
      mainArtifactSetId: {
        type: String,
        required: true
      },
      secondaryArtifactSets: [
        {
          artifactSetIds: {
            type: [String],
            required: false
          },
          artifactSetName: {
            type: String,
            required: false
          }
        }
      ],
      rank: {
        type: Number,
        required: true
      }
    }
  ],
  mainStats: {
    sands: {
      type: [String],
      required: true
    },
    goblet: {
      type: [String],
      required: true
    },
    circlet: {
      type: [String],
      required: true
    },
    notes: {
      type: String,
      required: false
    }
  },
  subStats: {
    stats: {
      type: [String],
      required: true
    },
    notes: {
      type: String,
      required: false
    }
  },
  talentPriority: {
    normalAttack: {
      type: Number,
      required: true
    },
    elementalSkill: {
      type: Number,
      required: true
    },
    elementalBurst: {
      type: Number,
      required: true
    },
    notes: {
      type: String,
      required: false
    }
  }
});

export interface ICharacterBuild
  extends ICharacterBuildInput,
    mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const CharacterBuildModel = mongoose.model<ICharacterBuild>(
  "CharacterBuild",
  characterBuildSchema
);

export default CharacterBuildModel;
