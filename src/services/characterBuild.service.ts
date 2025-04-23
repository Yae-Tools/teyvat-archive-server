import { Kysely } from "kysely";
import type { IDatabase } from "../types/database.types";
import type { ICharacterBuildInput } from "../types/characterBuild.types";

export class CharacterBuildService {
  constructor(private readonly db: Kysely<IDatabase>) {}

  async createCharacterBuild(buildData: ICharacterBuildInput) {
    // 1. Insert the main character build
    const build = await this.insertCharacterBuild(buildData);

    // 2. Insert weapons for this build
    await this.insertBuildWeapons(build.id, buildData.weapons);

    // 3. Insert artifacts with their sets
    await this.insertBuildArtifacts(build.id, buildData.artifacts);

    return build;
  }

  private async insertCharacterBuild(buildData: ICharacterBuildInput) {
    const {
      authorId,
      characterId,
      buildName,
      lastUpdatedPatch,
      mainStats,
      subStats,
      talentPriority,
      notes = ""
    } = buildData;

    return await this.db
      .insertInto("character_builds")
      .values({
        author_id: authorId,
        character_id: characterId,
        build_name: buildName,
        last_updated_patch: lastUpdatedPatch,
        main_stats: JSON.stringify(mainStats),
        sub_stats: JSON.stringify(subStats),
        talent_priority: JSON.stringify(talentPriority),
        notes
      })
      .returningAll()
      .executeTakeFirstOrThrow();
  }

  private async insertBuildWeapons(
    buildId: string,
    weapons: {
      weaponId: number;
      weaponRank: number;
      weaponRefinement: number | null;
    }[]
  ) {
    const buildWeapons = weapons.map((weapon) => ({
      build_id: buildId,
      weapon_id: weapon.weaponId,
      refinement: weapon.weaponRefinement,
      rank: weapon.weaponRank
    }));

    return await this.db
      .insertInto("build_weapons")
      .values(buildWeapons)
      .returningAll()
      .execute();
  }

  private async insertBuildArtifacts(
    buildId: string,
    artifacts: {
      rank: number;
      artifactSets: {
        setId: string;
        piecesCount: number;
      }[];
    }[]
  ) {
    // 1. Insert basic build artifacts
    const buildArtifacts = artifacts.map((artifact) => ({
      build_id: buildId,
      rank: artifact.rank
    }));

    const artifactEntries = await this.db
      .insertInto("build_artifacts")
      .values(buildArtifacts)
      .returningAll()
      .execute();

    // 2. Connect artifact sets to the build artifacts
    const artifactSetValues: {
      build_artifact_id: number;
      artifact_set_id: string;
      piece_count: number;
    }[] = [];

    artifactEntries.forEach((artifactEntry, index) => {
      const artifact = artifacts[index];

      artifact.artifactSets.forEach((set) => {
        artifactSetValues.push({
          build_artifact_id: artifactEntry.id,
          artifact_set_id: set.setId,
          piece_count: set.piecesCount
        });
      });
    });

    return await this.db
      .insertInto("build_artifact_sets")
      .values(artifactSetValues)
      .returningAll()
      .execute();
  }

  async getCharacterBuild(buildId: string) {
    return await this.db
      .selectFrom("character_builds")
      .where("id", "=", buildId)
      .selectAll()
      .executeTakeFirst();
  }

  async getAllCharacterBuilds() {
    return await this.db.selectFrom("character_builds").selectAll().execute();
  }
}
