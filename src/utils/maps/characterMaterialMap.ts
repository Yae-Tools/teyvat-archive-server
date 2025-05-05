import decryptTextAsset from "../../helpers/decryptTextAssets";
import { getAllCharactersFromEnka } from "../../services/enkaClient.service";
import type { ICustomBaseCharacter } from "../../types/enka.type";

export function buildMaterialToCharacterMap() {
  const characters = getAllCharactersFromEnka();
  const materialToCharacterMap = new Map<number, ICustomBaseCharacter[]>();

  characters
    .filter((char) => char.element !== null)
    .forEach((character) => {
      const { normalAttack } = character;
      const upgradeCost = normalAttack.getUpgradeCost(3);

      if (!upgradeCost) return;

      const customCharacter: ICustomBaseCharacter = {
        id: character.id,
        name: decryptTextAsset(character.name),
        iconUrl: character.icon.url,
        element: decryptTextAsset(character.element?.name),
        isTraveler: character.isTraveler,
        rarity: character.rarity,
        nameId: character._nameId
      };

      upgradeCost.items
        .filter(
          (item) => item.material.materialType === "MATERIAL_AVATAR_MATERIAL"
        )
        .forEach((item) => {
          const materialId = item.material.id;

          if (!materialToCharacterMap.has(materialId)) {
            materialToCharacterMap.set(materialId, []);
          }

          materialToCharacterMap.get(materialId)!.push(customCharacter);
        });
    });

  return materialToCharacterMap;
}
