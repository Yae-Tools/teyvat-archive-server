import fs from "fs";
import path from "path";
import crypto from "crypto";

const HOYOPLAY_REQUEST_CAPTURE_URL = process.env.HOYOPLAY_REQUEST_CAPTURE_URL;
const ANIME_GAME_DATA_FETTER_EXCEL_OUTPUT_URL =
  process.env.ANIME_GAME_DATA_FETTER_EXCEL_OUTPUT_URL;

const FETTER_FILE_PATH = path.join(
  __dirname,
  "..",
  "data",
  "FetterInfoExcelConfigData.json"
);
const FETTER_METADATA_PATH = path.join(
  __dirname,
  "..",
  "data",
  "FetterInfoMetadata.json"
);
const EVENT_FILE_PATH = path.join(__dirname, "..", "data", "EventInfo.json");
const EVENT_METADATA_PATH = path.join(
  __dirname,
  "..",
  "data",
  "EventInfoMetadata.json"
);

function getCurrentTimestamp(): number {
  return Math.floor(Date.now() / 1000); // Convert to seconds
}

function calculateFileHash(data: string): string {
  return crypto.createHash("md5").update(data).digest("hex");
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
    console.log("Data is up to date. No fetch needed.");
    return JSON.parse(fs.readFileSync(EVENT_FILE_PATH, "utf8"));
  }

  console.log("Fetching latest event data...");

  // Fetch the remote data
  const response = await fetch(HOYOPLAY_REQUEST_CAPTURE_URL as string);
  if (!response.ok) {
    console.error("Failed to fetch event data:", response.statusText);
    return;
  }

  const data = await response.text();
  const newHash = calculateFileHash(data);

  // If the data hasn't changed, no need to update
  if (newHash === lastHash) {
    console.log("No changes detected. Skipping event update.");
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

  console.log("Event data updated successfully.");
  return data;
}

export async function fetchFetterInfoExcelConfigData() {
  // Ensure the directory exists
  if (!fs.existsSync(path.dirname(FETTER_FILE_PATH))) {
    fs.mkdirSync(path.dirname(FETTER_FILE_PATH), { recursive: true });
  }

  let lastFetched = 0;
  let lastHash: string | null = null;

  if (fs.existsSync(FETTER_METADATA_PATH)) {
    const metadata: IMetadata = JSON.parse(
      fs.readFileSync(FETTER_METADATA_PATH, "utf8")
    );
    lastFetched = metadata.lastFetched || 0;
    lastHash = metadata.hash ?? null;
  }

  const now = getCurrentTimestamp();
  const timeElapsed = now - lastFetched;
  const fetchInterval = 24 * 60 * 60; // 24 hours in seconds

  // If the file exists and it was fetched recently, no need to fetch again
  if (fs.existsSync(FETTER_FILE_PATH) && timeElapsed < fetchInterval) {
    console.log("Data is up to date. No fetch needed.");
    return JSON.parse(fs.readFileSync(FETTER_FILE_PATH, "utf8"));
  }

  console.log("Fetching latest data...");

  // Fetch the remote data
  const response = await fetch(
    ANIME_GAME_DATA_FETTER_EXCEL_OUTPUT_URL as string
  );
  if (!response.ok) {
    console.error("Failed to fetch data:", response.statusText);
    return;
  }

  const data = await response.text();
  const newHash = calculateFileHash(data);

  // If the data hasn't changed, no need to update
  if (newHash === lastHash) {
    console.log("No changes detected. Skipping update.");
    return JSON.parse(data);
  }

  // Write the new data to the file and update metadata
  fs.writeFileSync(FETTER_FILE_PATH, data, "utf8");
  const metadata: IMetadata = { lastFetched: now, hash: newHash };
  fs.writeFileSync(
    FETTER_METADATA_PATH,
    JSON.stringify(metadata, null, 2),
    "utf8"
  );

  console.log("Data updated successfully.");
  return JSON.parse(data);
}
