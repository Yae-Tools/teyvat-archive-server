export default function uniqueIdMapper(
  name: string,
  skillDepotId: number
): string {
  let id = name;
  if (name === "PlayerBoy" || name === "PlayerGirl") {
    switch (skillDepotId) {
      case 502:
        id = "traveler_pyro_aether";
        break;
      case 503:
        id = "traveler_hydro_aether";
        break;
      case 504:
        id = "traveler_anemo_aether";
        break;
      case 506:
        id = "traveler_geo_aether";
        break;
      case 507:
        id = "traveler_electro_aether";
        break;
      case 508:
        id = "traveler_dendro_aether";
        break;

      // PLAYER GIRL
      case 702:
        id = "traveler_pyro_lumine";
        break;
      case 703:
        id = "traveler_hydro_lumine";
        break;
      case 704:
        id = "traveler_anemo_lumine";
        break;
      case 706:
        id = "traveler_geo_lumine";
        break;
      case 707:
        id = "traveler_electro_lumine";
        break;
      case 708:
        id = "traveler_dendro_lumine";
        break;
    }
  }
  return id;
}
