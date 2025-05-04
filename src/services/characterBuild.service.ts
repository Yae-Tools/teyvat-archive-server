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
      notes,
      talentNotes,
      statNotes,
      weaponNotes,
      artifactNotes
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
        notes: notes ?? "",
        talent_notes: talentNotes ?? "",
        stat_notes: statNotes ?? "",
        weapon_notes: weaponNotes ?? "",
        artifact_notes: artifactNotes ?? ""
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

  async getWeaponsByBuildId(buildId: string) {
    return await this.db
      .selectFrom("build_weapons")
      .where("build_id", "=", buildId)
      .selectAll()
      .execute();
  }

  async getArtifactsByBuildId(buildId: string) {
    return await this.db
      .selectFrom("build_artifacts")
      .where("build_id", "=", buildId)
      .selectAll()
      .execute();
  }

  async getArtifactSetsByBuildArtifactId(buildArtifactId: number) {
    return await this.db
      .selectFrom("build_artifact_sets")
      .where("build_artifact_id", "=", buildArtifactId)
      .selectAll()
      .execute();
  }

  async getFullCharacterBuildById(buildId: string) {
    // Get all character builds
    const builds = await this.db
      .selectFrom("character_builds")
      .where("character_builds.id", "=", buildId)
      .leftJoin(
        "user_profiles",
        "user_profiles.user_id",
        "character_builds.author_id"
      )
      .select([
        "character_builds.id",
        "character_builds.build_name",
        "character_builds.character_id",
        "character_builds.last_updated_patch",
        "character_builds.main_stats",
        "character_builds.sub_stats",
        "character_builds.talent_priority",
        "character_builds.notes",
        "character_builds.talent_notes",
        "character_builds.stat_notes",
        "character_builds.weapon_notes",
        "character_builds.artifact_notes",
        "character_builds.created_at",
        "character_builds.updated_at",
        "user_profiles.id as author_id",
        "user_profiles.display_name as author_name",
        "user_profiles.profile_picture as author_profile_picture"
      ])
      .execute();

    // For each build, get related weapons and artifacts
    const fullBuilds = await Promise.all(
      builds.map(async (build) => {
        // Get weapons for this build
        const weapons = await this.db
          .selectFrom("build_weapons")
          .where("build_weapons.build_id", "=", build.id)
          .select([
            "build_weapons.refinement",
            "build_weapons.rank",
            "build_weapons.weapon_id",
            "build_weapons.id as build_weapon_id"
          ])
          .execute();

        // Get artifacts for this build
        const buildArtifacts = await this.db
          .selectFrom("build_artifacts")
          .where("build_artifacts.build_id", "=", build.id)
          .selectAll()
          .execute();

        // For each build artifact, get its artifact sets
        const artifacts = await Promise.all(
          buildArtifacts.map(async (artifact) => {
            const artifactSets = await this.db
              .selectFrom("build_artifact_sets")
              .where("build_artifact_sets.build_artifact_id", "=", artifact.id)
              .select([
                "build_artifact_sets.piece_count",
                "build_artifact_sets.artifact_set_id",
                "build_artifact_sets.id as build_artifact_set_id"
              ])
              .execute();

            return {
              ...artifact,
              artifactSets
            };
          })
        );

        // Parse JSON strings into objects
        const mainStats =
          typeof build.main_stats === "string"
            ? JSON.parse(build.main_stats)
            : build.main_stats;
        const subStats =
          typeof build.sub_stats === "string"
            ? JSON.parse(build.sub_stats)
            : build.sub_stats;
        const talentPriority =
          typeof build.talent_priority === "string"
            ? JSON.parse(build.talent_priority)
            : build.talent_priority;

        // Return complete build with all related data
        return {
          id: build.id,
          buildName: build.build_name,
          lastUpdatedPatch: build.last_updated_patch,
          mainStats,
          subStats,
          talentPriority,
          notes: build.notes,
          talentNotes: build.talent_notes,
          statNotes: build.stat_notes,
          weaponNotes: build.weapon_notes,
          artifactNotes: build.artifact_notes,
          createdAt: build.created_at,
          updatedAt: build.updated_at,
          characterId: build.character_id,
          author: {
            id: build.author_id,
            username: build.author_name,
            profilePicture: build.author_profile_picture
          },
          weapons,
          artifacts
        };
      })
    );

    return fullBuilds;
  }
}
