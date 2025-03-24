import fs from "fs";
import path from "path";
import crypto from "crypto";

const HOYOPLAY_REQUEST_CAPTURE_URL = process.env.HOYOPLAY_REQUEST_CAPTURE_URL;
const ANIME_GAME_DATA_FETTER_EXCEL_OUTPUT_URL =
  process.env.ANIME_GAME_DATA_FETTER_EXCEL_OUTPUT_URL;

const FILE_PATH = path.join(
  __dirname,
  "..",
  "data",
  "FetterInfoExcelConfigData.json"
);
const METADATA_PATH = path.join(
  __dirname,
  "..",
  "data",
  "FetterInfoMetadata.json"
);

export async function fetchHoyoPlayRequest() {
  const response = await fetch(`${HOYOPLAY_REQUEST_CAPTURE_URL}`);
  return response.json();
}

export async function fetchFetterInfoExcelConfigData() {
  function getCurrentTimestamp(): number {
    return Math.floor(Date.now() / 1000); // Convert to seconds
  }

  function calculateFileHash(data: string): string {
    return crypto.createHash("md5").update(data).digest("hex");
  }

  // Ensure the directory exists
  if (!fs.existsSync(path.dirname(FILE_PATH))) {
    fs.mkdirSync(path.dirname(FILE_PATH), { recursive: true });
  }

  let lastFetched = 0;
  let lastHash: string | null = null;

  if (fs.existsSync(METADATA_PATH)) {
    const metadata: IMetadata = JSON.parse(
      fs.readFileSync(METADATA_PATH, "utf8")
    );
    lastFetched = metadata.lastFetched || 0;
    lastHash = metadata.hash ?? null;
  }

  const now = getCurrentTimestamp();
  const timeElapsed = now - lastFetched;
  const fetchInterval = 24 * 60 * 60; // 24 hours in seconds

  // If the file exists and it was fetched recently, no need to fetch again
  if (fs.existsSync(FILE_PATH) && timeElapsed < fetchInterval) {
    console.log("Data is up to date. No fetch needed.");
    return JSON.parse(fs.readFileSync(FILE_PATH, "utf8"));
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
  fs.writeFileSync(FILE_PATH, data, "utf8");
  const metadata: IMetadata = { lastFetched: now, hash: newHash };
  fs.writeFileSync(METADATA_PATH, JSON.stringify(metadata, null, 2), "utf8");

  console.log("Data updated successfully.");
  return JSON.parse(data);
}
