import { EnkaClient } from "enka-network-api";
import logger from "../utils/logger";

const enka = new EnkaClient({
  defaultLanguage: "en",
  githubToken: process.env.GITHUB_TOKEN,
});

enka.cachedAssetsManager.activateAutoCacheUpdater({
  instant: true, // Run the first update check immediately
  timeout: 60 * 120 * 1000, // 2 hour interval
  onUpdateStart: async () => {
    logger.info("Updating Genshin Data...");
  },
  onUpdateEnd: async () => {
    enka.cachedAssetsManager.refreshAllData(); // Refresh memory
    logger.info("Genshin Data Updated!");
  },
});

export function getAllCharactersFromEnka() {
  return enka.getAllCharacters();
}

export function getCharacterByIdFromEnka(id: number, skillDepotId: number) {
  return enka.getCharacterById(id, skillDepotId);
}

export function getAllWeaponsFromEnka() {
  return enka.getAllWeapons();
}

export const getWeaponByIdFromEnka = (id: string) => {
  return enka.getWeaponById(id);
};

export const getAllArtifactsFromEnka = () => {
  return enka.getAllArtifacts();
};

export const getAllArtifactSetsFromEnka = () => {
  return enka.getAllArtifactSets();
};

export const getArtifactSetByIdFromEnka = (id: string) => {
  return enka.getArtifactSetById(id);
};

export function getMaterialByEnkaId(materialId: number) {
  return enka.getMaterialById(materialId);
}
