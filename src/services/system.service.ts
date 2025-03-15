const HOYOPLAY_REQUEST_CAPTURE_URL = process.env.HOYOPLAY_REQUEST_CAPTURE_URL;

export async function fetchHoyoPlayRequest() {
  const response = await fetch(`${HOYOPLAY_REQUEST_CAPTURE_URL}`);
  return response.json();
}
