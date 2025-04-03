export interface ICharacterBuild {
  buildId: string;
  buildName: string;
  lastUpdate: string;
  weapons: {
    weaponId: string;
    weaponName: string;
    weaponIcon: string;
    refinement: number | null;
    rank: number;
  }[];
  artifacts: {
    mainArtifactSetId: string;
    secondaryArtifactSets?: [
      {
        artifactSetIds: string[];
        artifactSetName: string;
      }
    ];
    rank: number;
  }[];

  mainStats: {
    sands: string[];
    goblet: string[];
    circlet: string[];
    notes: string;
  };
  subStats: {
    stats: string[];
    notes: string;
  };
  talentPriority: {
    normalAttack: number;
    elementalSkill: number;
    elementalBurst: number;
    notes: string;
  };
  notes: string;
}
