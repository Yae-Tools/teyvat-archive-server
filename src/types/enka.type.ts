import { EquipType } from "enka-network-api";

interface ICustomBaseArtifact {
  id: number;
  equipType: EquipType;
  equipTypeName: string | undefined;
  name: string | undefined;
  icon: string | null;
  stars: number;
  description: string | undefined;
}

interface ICustomArtifact extends ICustomBaseArtifact {
  set: {
    id: number;
    name: string | undefined;
    icon: string | null;
  };
}

export type { ICustomBaseArtifact, ICustomArtifact };
