import {
  fetchHoyoGameRequest,
  fetchHoyoPlayRequest,
} from "../services/system.service";

export const getGameVersion = async () => {
  try {
    const [hoyoPlayResponse, hoyoGameResponse] = await Promise.all([
      fetchHoyoPlayRequest(),
      fetchHoyoGameRequest(),
    ]);

    const hoyoPlayParsed = JSON.parse(hoyoPlayResponse);
    const hoyoGameParsed = JSON.parse(hoyoGameResponse);

    const games = hoyoGameParsed.data.games;
    const bgImage = games.find(
      (game: { id: string }) => game.id === "gopR6Cufr3"
    ).display.background.url;

    return {
      version: hoyoPlayParsed.data.tag,
      build: hoyoPlayParsed.data.build_id,
      background: bgImage,
    };
  } catch (error) {
    return { version: "Unknown", build: "" };
  }
};
