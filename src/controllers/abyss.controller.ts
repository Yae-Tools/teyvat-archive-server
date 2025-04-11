import {
  fetchAbyssBlessingInfo,
  fetchAbyssInfo
} from "../services/system.service";
import { parseCharacterData, parsePartyData } from "../utils/abyssDataParser";

export const getAbyssData = async () => {
  try {
    const abyssResponse = await fetchAbyssInfo();
    const abyssParsed: IAbyssData = JSON.parse(abyssResponse!);

    const sanitizedData = {
      meta: abyssParsed.meta,
      data: {
        schedule: abyssParsed.data.schedule,
        sampleSize: abyssParsed.data.sample_size,
        sampleSize_x_a: abyssParsed.data.sample_size_x_a,
        sampleSize_x_b: abyssParsed.data.sample_size_x_b,
        sampleCollectionProgress: abyssParsed.data.sample_collection_progress,
        sampleCountries: abyssParsed.data.sample_countries,
        threshold: abyssParsed.data.threshold
      },
      characters: parseCharacterData(abyssParsed.data.character),
      parties: {
        firstHalf: parsePartyData(abyssParsed.data.party["1"]),
        secondHalf: parsePartyData(abyssParsed.data.party["2"])
      }
    };

    return sanitizedData;
  } catch (error) {
    console.error("Error fetching abyss data:", error);
    return null;
  }
};

export const getAbyssMoonBlessingData = async () => {
  try {
    const abyssBlessingResponse = await fetchAbyssBlessingInfo();
    const abyssBlessingParsed: IAbyssBlessingData = JSON.parse(
      abyssBlessingResponse!
    );

    const sanitizedData = Object.keys(abyssBlessingParsed).map((key) => {
      const blessing = abyssBlessingParsed[key];
      return {
        id: key,
        begin: blessing.live_begin,
        end: blessing.live_end,
        icon: blessing.icon,
        name: blessing.EN,
        description: blessing.desc
      };
    });

    return sanitizedData;
  } catch (error) {
    console.error("Error fetching abyss blessing data:", error);
    return null;
  }
};
