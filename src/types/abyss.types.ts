/* eslint-disable @typescript-eslint/no-unused-vars */
interface IAbyssMeta {
  author: string;
  version: string;
}

interface IAbyssSchedule {
  id: number;
  start_time: number;
  end_time: number;
}

interface IAbyssSampleCountries {
  id: string;
  value: string;
  color: string;
}

interface IAbyssCharacterArtifacts {
  set: {
    [key: string]: number;
  };
  value: number;
}

interface IAbyssGeneric {
  id: string;
  value: number;
}

interface IAbyssCharacter {
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

interface IAbyssPartyData {
  id: string;
  value: number;
  own_rate: number;
  use_by_own_rate: number;
}

interface IAbyssParty {
  [key: string]: {
    [key: string]: IAbyssPartyData[];
  };
}

interface IAbyssData {
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

interface IAbyssBlessing {
  begin: string;
  end: string;
  icon: string;
  EN: string;
  desc: string;
  live_begin: string;
  live_end: string;
}

interface IAbyssBlessingData {
  [key: string]: IAbyssBlessing;
}
