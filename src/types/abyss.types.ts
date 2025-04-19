export interface IAbyssMeta {
  author: string;
  version: string;
}

export interface IAbyssSchedule {
  id: number;
  start_time: number;
  end_time: number;
}

export interface IAbyssSampleCountries {
  id: string;
  value: string;
  color: string;
}

export interface IAbyssCharacterArtifacts {
  set: {
    [key: string]: number;
  };
  value: number;
}

export interface IAbyssGeneric {
  id: string;
  value: number;
}

export interface IAbyssCharacter {
  [key: string]: {
    use_rate: number;
    own_rate: number;
    use_by_own_rate: number;
    weapons: IAbyssGeneric[];
    artifacts: IAbyssCharacterArtifacts[];
    constellations: IAbyssGeneric[];
    relation_overall: IAbyssGeneric[];
    relation_by_constellation: {
      [key: string]: {
        [key: string]: number;
      };
    };
    best_damages: {
      p: number;
      value: number;
    }[];
    builds: {
      id: string;
      artifact_set: {
        [key: string]: number;
      };
      artifact_prop_main_ids: string[];
      weapons: IAbyssGeneric[];
      constellations: IAbyssGeneric[];
      sample_size: number;
    }[];
  };
}

export interface IAbyssPartyData {
  id: string;
  value: number;
  own_rate: number;
  use_by_own_rate: number;
}

export interface IAbyssParty {
  [key: string]: IAbyssPartyData[];
}

export interface IAbyssData {
  meta: IAbyssMeta;
  data: {
    schedule: IAbyssSchedule;
    sample_collection_progress: number;
    sample_size: number;
    sample_size_x_a: number;
    sample_size_x_b: number;
    sample_countries: IAbyssSampleCountries[];
    threshold: {
      use_rate: number;
    };
    character: IAbyssCharacter;
    party: IAbyssParty;
  };
}

export interface IAbyssBlessing {
  begin: string;
  end: string;
  icon: string;
  EN: string;
  desc: string;
  live_begin: string;
  live_end: string;
}

export interface IAbyssBlessingData {
  [key: string]: IAbyssBlessing;
}
