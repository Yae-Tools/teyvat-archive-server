import fs from "fs";
import path from "path";
import crypto from "crypto";
import logger from "../utils/logger";

const BASE_DIR = path.join(__dirname, "..", "data");

const FILES = {
  calendar: {
    data: path.join(BASE_DIR, "HoyoApiCalendar.json"),
    meta: path.join(BASE_DIR, "HoyoApiCalendarMetadata.json"),
    url: process.env.HOYO_API + "/calendar",
    name: "Calendar",
  },
  codes: {
    data: path.join(BASE_DIR, "RedeemCodes.json"),
    meta: path.join(BASE_DIR, "RedeemCodesMetadata.json"),
    url: process.env.HOYO_API + "/codes",
    name: "Redeem Codes",
  },
  game: {
    data: path.join(BASE_DIR, "HoyoGameInfo.json"),
    meta: path.join(BASE_DIR, "HoyoGameInfoMetadata.json"),
    url: process.env.HOYO_GAME_CAPTURE_URL,
    name: "Game",
  },
  build: {
    data: path.join(BASE_DIR, "BuildInfo.json"),
    meta: path.join(BASE_DIR, "BuildInfoMetadata.json"),
    url: process.env.HOYOPLAY_REQUEST_CAPTURE_URL,
    name: "Build",
  },
  events: {
    data: path.join(BASE_DIR, "AmberEvents.json"),
    meta: path.join(BASE_DIR, "AmberEventsMetadata.json"),
    url: process.env.PROJECT_AMBR_BASE_URL + "/assets/data/event.json",
    name: "Amber Events",
  },
};

function getCurrentTimestamp(): number {
  return Math.floor(Date.now() / 1000); // Convert to seconds
}

function calculateFileHash(data: string): string {
  return crypto.createHash("md5").update(data).digest("hex");
}

async function fetchData(fileKey: keyof typeof FILES) {
  const { data: filePath, meta: metaPath, url, name } = FILES[fileKey];

  // Ensure directory exists
  if (!fs.existsSync(BASE_DIR)) {
    fs.mkdirSync(BASE_DIR, { recursive: true });
  }

  // Load metadata
  let metadata: IMetadata = { lastFetched: 0, hash: null };
  if (fs.existsSync(metaPath)) {
    metadata = JSON.parse(fs.readFileSync(metaPath, "utf8"));
  }

  const now = getCurrentTimestamp();
  const timeElapsed = now - metadata.lastFetched;

  // Return cached data if recent
  if (fs.existsSync(filePath) && timeElapsed < 60) {
    logger.info(`${name} data is up to date. No fetch needed.`);
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  }

  logger.info(`Fetching latest ${name.toLowerCase()} data...`);

  // Fetch new data
  const response = await fetch(url as string);
  if (!response.ok) {
    logger.error(
      `Failed to fetch ${name.toLowerCase()} data:`,
      response.statusText
    );
    return;
  }

  const data = await response.text();
  const newHash = calculateFileHash(data);

  // Return if no changes
  if (newHash === metadata.hash) {
    logger.info(`No changes detected. Skipping ${name.toLowerCase()} update.`);
    return data;
  }

  // Update files
  fs.writeFileSync(filePath, data, "utf8");
  fs.writeFileSync(
    metaPath,
    JSON.stringify({ lastFetched: now, hash: newHash }, null, 2),
    "utf8"
  );

  logger.info(`${name} data updated successfully.`);
  return data;
}

export const fetchHoyoCalendar = () => fetchData("calendar");
export const fetchHoyoGameRequest = () => fetchData("game");
export const fetchHoyoPlayRequest = () => fetchData("build");
export const fetchAmberEvents = () => fetchData("events");
export const fetchRedeemCodes = () => fetchData("codes");
