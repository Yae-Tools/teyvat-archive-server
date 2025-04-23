export interface ICharacterBuildInput {
  authorId: string;
  characterId: string;
  buildName: string;
  lastUpdatedPatch: string;
  mainStats: {
    sands: string[];
    goblet: string[];
    circlet: string[];
  };
  subStats: string[];
  talentPriority: {
    normalAttack: number;
    elementalSkill: number;
    elementalBurst: number;
  };
  notes?: string;
  artifactNotes?: string;
  statNotes?: string;
  talentNotes?: string;
  weaponNotes?: string;
  weapons: {
    weaponId: number;
    weaponRank: number;
    weaponRefinement: number | null;
  }[];
  artifacts: {
    rank: number;
    artifactSets: {
      setId: string;
      piecesCount: number;
    }[];
  }[];
}
