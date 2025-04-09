import { refetchEnkaCache } from "../services/enkaClient.service";
import {
  fetchHoyoGameRequest,
  fetchHoyoPlayRequest
} from "../services/system.service";

export const getGameVersion = async () => {
  try {
    const [hoyoPlayResponse, hoyoGameResponse] = await Promise.all([
      fetchHoyoPlayRequest(),
      fetchHoyoGameRequest()
    ]);

    const hoyoPlayParsed = JSON.parse(hoyoPlayResponse ?? "{}");
    const hoyoGameParsed = JSON.parse(hoyoGameResponse ?? "{}");

    const games = hoyoGameParsed.data.games;

    const game = games.find(
      (game: { id: string }) => game.id === "gopR6Cufr3"
    ).display;

    return {
      version: hoyoPlayParsed.data.tag,
      build: hoyoPlayParsed.data.build_id,
      background: game.background.url,
      logo: game.logo.url
    };
  } catch (error: unknown) {
    return { version: "Unknown", build: "", error: error };
  }
};

export const refetchCache = async () => {
  try {
    await refetchEnkaCache();
  } catch (error) {
    console.error("Error refetching cache:", error);
    throw error;
  }
};
