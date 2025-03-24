import { fetchHoyoPlayRequest } from "../services/system.service";

export const getGameVersion = async () => {
  try {
    const response = await fetchHoyoPlayRequest();
    const parsed = JSON.parse(response);

    return {
      version: parsed.data.tag,
      build: parsed.data.build_id,
    };
  } catch (error) {
    return { version: "Unknown", build: "" };
  }
};
