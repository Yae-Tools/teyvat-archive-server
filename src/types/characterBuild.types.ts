export interface ICharacterBuildInput {
  authorId: string;
  characterId: string;
  buildName: string;
  lastUpdatedPatch: string;
  mainStats: any;
  subStats: any;
  talentPriority?: any;
  notes?: string;
  weapons: {
    weaponId: string;
    weaponRank: number;
    weaponRefinement: number | null;
  }[]; // Default empty array
  artifacts: {
    rank: number;
    artifactSets: {
      setId: string;
      piecesCount: number;
    }[];
  }[]; // Default empty array
}
