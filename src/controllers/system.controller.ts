import { fetchHoyoPlayRequest } from "../services/system.service";

export const getGameVersion = async () => {
  try {
    const response = await fetchHoyoPlayRequest();
    return {
      version: response.data.tag,
      build: response.data.build_id,
    };
  } catch (error) {}
};
