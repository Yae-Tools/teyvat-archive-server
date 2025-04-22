import { EnkaClient } from "enka-network-api";

export const enka = new EnkaClient({
  defaultLanguage: "en",
  githubToken: process.env.AUTH_TOKEN,
  cacheDirectory: "src/data/enka-cache"
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

export async function checkIfEnkaIsUpToDate() {
  console.log("Checking if Enka is up to date...");
  const updatesAvailable = await enka.cachedAssetsManager.checkForUpdates();

  if (updatesAvailable) {
    console.log("Enka is not up to date, refetching...");
    await refetchEnkaCache();
  }

  console.log("Enka is up to date");
  return true;
}

export async function refetchEnkaCache() {
  await enka.cachedAssetsManager.fetchAllContents();
  enka.cachedAssetsManager.refreshAllData();
}
