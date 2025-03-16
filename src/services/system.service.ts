const HOYOPLAY_REQUEST_CAPTURE_URL = process.env.HOYOPLAY_REQUEST_CAPTURE_URL;
const ANIME_GAME_DATA_FETTER_EXCEL_OUTPUT_URL =
  process.env.ANIME_GAME_DATA_FETTER_EXCEL_OUTPUT_URL;

export async function fetchHoyoPlayRequest() {
  const response = await fetch(`${HOYOPLAY_REQUEST_CAPTURE_URL}`);
  return response.json();
}

export async function fetchFetterInfoExcelConfigData() {
  const response = await fetch(`${ANIME_GAME_DATA_FETTER_EXCEL_OUTPUT_URL}`);

  return response.json();
}
