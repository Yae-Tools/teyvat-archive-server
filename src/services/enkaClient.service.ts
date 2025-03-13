import { EnkaClient } from "enka-network-api";

const enka = new EnkaClient({
  defaultLanguage: "en",
});

enka.cachedAssetsManager.activateAutoCacheUpdater({
  instant: true, // Run the first update check immediately
  timeout: 60 * 60 * 1000, // 1 hour interval
  onUpdateStart: async () => {
    console.log("Updating Genshin Data...");
  },
  onUpdateEnd: async () => {
    enka.cachedAssetsManager.refreshAllData(); // Refresh memory
    console.log("Updating Completed!");
  },
});

export function getAllCharactersFromEnka() {
  return enka.getAllCharacters();
}

export function getCharacterByIdFromEnka(id: string, skillDepotId: number) {
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

export function getMaterialByEnkaId(materialId: number) {
  return enka.getMaterialById(materialId);
}
