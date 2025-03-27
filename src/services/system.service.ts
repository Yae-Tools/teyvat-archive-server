import fs from "fs";
import path from "path";
import crypto from "crypto";
import logger from "../utils/logger";

const HOYOPLAY_REQUEST_CAPTURE_URL = process.env.HOYOPLAY_REQUEST_CAPTURE_URL;
const HOYO_GAME_CAPTURE_URL = process.env.HOYO_GAME_CAPTURE_URL;

const EVENT_FILE_PATH = path.join(__dirname, "..", "data", "EventInfo.json");
const EVENT_METADATA_PATH = path.join(
  __dirname,
  "..",
  "data",
  "EventInfoMetadata.json"
);

const HOYO_GAME_FILE_PATH = path.join(
  __dirname,
  "..",
  "data",
  "HoyoGameInfo.json"
);
const HOYO_GAME_METADATA_PATH = path.join(
  __dirname,
  "..",
  "data",
  "HoyoGameInfoMetadata.json"
);

function getCurrentTimestamp(): number {
  return Math.floor(Date.now() / 1000); // Convert to seconds
}

function calculateFileHash(data: string): string {
  return crypto.createHash("md5").update(data).digest("hex");
}

export async function fetchHoyoGameRequest() {
  if (!fs.existsSync(path.dirname(HOYO_GAME_FILE_PATH))) {
    fs.mkdirSync(path.dirname(HOYO_GAME_FILE_PATH), { recursive: true });
  }

  let lastFetched = 0;
  let lastHash: string | null = null;

  if (fs.existsSync(HOYO_GAME_METADATA_PATH)) {
    const metadata: IMetadata = JSON.parse(
      fs.readFileSync(HOYO_GAME_METADATA_PATH, "utf8")
    );
    lastFetched = metadata.lastFetched || 0;
    lastHash = metadata.hash ?? null;
  }

  const now = getCurrentTimestamp();
  const timeElapsed = now - lastFetched;

  // If the file exists and it was fetched recently, no need to fetch again
  if (fs.existsSync(HOYO_GAME_FILE_PATH) && timeElapsed < 60) {
    logger.info("Game data is up to date. No fetch needed.");
    return JSON.parse(fs.readFileSync(HOYO_GAME_FILE_PATH, "utf8"));
  }

  logger.info("Fetching latest game data...");

  // Fetch the remote data
  const response = await fetch(HOYO_GAME_CAPTURE_URL as string);
  if (!response.ok) {
    logger.error("Failed to fetch game data:", response.statusText);
    return;
  }

  const data = await response.text();
  const newHash = calculateFileHash(data);

  // If the data hasn't changed, no need to update
  if (newHash === lastHash) {
    logger.info("No changes detected. Skipping game update.");
    return data;
  }

  // Write the new data to the file and update metadata
  fs.writeFileSync(HOYO_GAME_FILE_PATH, data, "utf8");
  const metadata: IMetadata = { lastFetched: now, hash: newHash };
  fs.writeFileSync(
    HOYO_GAME_METADATA_PATH,
    JSON.stringify(metadata, null, 2),
    "utf8"
  );

  logger.info("Game data updated successfully.");
  return data;
}

export async function fetchHoyoPlayRequest() {
  if (!fs.existsSync(path.dirname(EVENT_FILE_PATH))) {
    fs.mkdirSync(path.dirname(EVENT_FILE_PATH), { recursive: true });
  }

  let lastFetched = 0;
  let lastHash: string | null = null;

  if (fs.existsSync(EVENT_METADATA_PATH)) {
    const metadata: IMetadata = JSON.parse(
      fs.readFileSync(EVENT_METADATA_PATH, "utf8")
    );
    lastFetched = metadata.lastFetched || 0;
    lastHash = metadata.hash ?? null;
  }

  const now = getCurrentTimestamp();
  const timeElapsed = now - lastFetched;

  // If the file exists and it was fetched recently, no need to fetch again
  if (fs.existsSync(EVENT_FILE_PATH) && timeElapsed < 60) {
    logger.info("Event data is up to date. No fetch needed.");
    return JSON.parse(fs.readFileSync(EVENT_FILE_PATH, "utf8"));
  }

  logger.info("Fetching latest event data...");

  // Fetch the remote data
  const response = await fetch(HOYOPLAY_REQUEST_CAPTURE_URL as string);
  if (!response.ok) {
    logger.error("Failed to fetch event data:", response.statusText);
    return;
  }

  const data = await response.text();
  const newHash = calculateFileHash(data);

  // If the data hasn't changed, no need to update
  if (newHash === lastHash) {
    logger.info("No changes detected. Skipping event update.");
    return data;
  }

  // Write the new data to the file and update metadata
  fs.writeFileSync(EVENT_FILE_PATH, data, "utf8");
  const metadata: IMetadata = { lastFetched: now, hash: newHash };
  fs.writeFileSync(
    EVENT_METADATA_PATH,
    JSON.stringify(metadata, null, 2),
    "utf8"
  );

  logger.info("Event data updated successfully.");
  return data;
}
