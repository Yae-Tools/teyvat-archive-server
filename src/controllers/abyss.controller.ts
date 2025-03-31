import { fetchAbyssInfo } from "../services/system.service";

export const getAbyssData = async () => {
  try {
    const abyssResponse = await fetchAbyssInfo();
    const abyssParsed: IAbyssData = JSON.parse(abyssResponse);

    const sanitizedData = {
      meta: abyssParsed.meta,
      data: {
        schedule: abyssParsed.data.schedule,
        sample_size: abyssParsed.data.sample_size,
        sample_size_x_a: abyssParsed.data.sample_size_x_a,
        sample_size_x_b: abyssParsed.data.sample_size_x_b,
        sample_collection_progress: abyssParsed.data.sample_collection_progress,
        sample_countries: abyssParsed.data.sample_countries,
        threshold: abyssParsed.data.threshold,
      },
      characters: Object.keys(abyssParsed.data.character).map((key) => {
        const character = abyssParsed.data.character[key];
        return {
          id: key,
          use_rate: character.use_rate,
          own_rate: character.own_rate,
          use_by_own_rate: character.use_by_own_rate,
          weapons: character.weapons.map((weapon) => ({
            id: weapon.id,
            value: weapon.value,
          })),
          artifacts: character.artifacts.map((artifact) => ({
            set: artifact.set,
            value: artifact.value,
          })),
          constellations: character.constellations.map((constellation) => ({
            id: constellation.id,
            value: constellation.value,
          })),
          //   relation_overall: character.relation_overall.map((relation) => ({
          //     id: relation.id,
          //     value: relation.value,
          //   })),
          //   relation_by_constellation: Object.keys(
          //     character.relation_by_constellation
          //   ).map((constellationKey) => ({
          //     constellation: constellationKey,
          //     relations: Object.keys(
          //       character.relation_by_constellation[constellationKey]
          //     ).map((relationKey) => ({
          //       id: relationKey,
          //       value:
          //         character.relation_by_constellation[constellationKey][
          //           relationKey
          //         ],
          //     })),
          //   })),
          //   best_damages: character.best_damages.map((damage) => ({
          //     p: damage.p,
          //     value: damage.value,
          //   })),
          //   builds: character.builds.map((build) => ({
          //     id: build.id,
          //     artifact_set: build.artifact_set,
          //     artifact_prop_main_ids: build.artifact_prop_main_ids,
          //     weapons: build.weapons.map((weapon) => ({
          //       id: weapon.id,
          //       value: weapon.value,
          //     })),
          //     constellations: build.constellations.map((constellation) => ({
          //       id: constellation.id,
          //       value: constellation.value,
          //     })),
          //     sample_size: build.sample_size,
          //   })),
        };
      }),
      parties: Object.keys(abyssParsed.data.party).map((key) => {
        const party = abyssParsed.data.party[key];
        return {
          id: key,
          value: party.value,
          own_rate: party.own_rate,
          use_by_own_rate: party.use_by_own_rate,
        };
      }),
    };

    return sanitizedData;
  } catch (error) {
    console.error("Error fetching abyss data:", error);
    return null;
  }
};
