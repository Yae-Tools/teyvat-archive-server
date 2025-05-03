import fs from "fs";
import { buildMaterialToCharacterMap } from "../utils/maps/characterMaterialMap";

export const systemServices = {
  createRequiredDirectories: async () => {
    // Create required directories if they don't exist
    const directories = ["src/data/enka-cache"];

    directories.forEach((dir) => {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
        console.log(`Directory created: ${dir}`);
      } else {
        console.log(`Directory already exists: ${dir}`);
      }
    });
  },
  preBuildCharacterMaterialMap: async () => buildMaterialToCharacterMap()
};
