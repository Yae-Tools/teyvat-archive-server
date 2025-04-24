import type { Request, Response } from "express";
import { CharacterBuildService } from "../services/characterBuild.service";
import { db } from "../db/db.client";
import type { CreateNewCharacterBuildInput } from "../schema/characterbuild.schema";

const characterBuildService = new CharacterBuildService(db);

export const getAllCharacterBuilds = async (_req: Request, res: Response) => {
  try {
    const response = await characterBuildService.getAllCharacterBuilds();
    const builds = response.map((build) => {
      return {
        authorId: build.author_id,
        buildId: build.id,
        buildName: build.build_name,
        lastUpdatedPatch: build.last_updated_patch,
        mainStats: build.main_stats,
        subStats: build.sub_stats,
        talentPriority: build.talent_priority,
        id: build.id,
        characterId: build.character_id,
        notes: build.notes,
        artifactNotes: build.artifact_notes,
        statNotes: build.stat_notes,
        talentNotes: build.talent_notes,
        weaponNotes: build.weapon_notes,
        weapons: build.weapons,
        artifacts: build.artifacts
      };
    });
    res.status(200).send(builds);
  } catch (error: unknown) {
    res.status(500).send({
      error:
        error instanceof Error ? error.message : "An unknown error occurred"
    });
  }
};

export const getCharacterBuildById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  const { id } = req.params;

  try {
    const response = await characterBuildService.getCharacterBuild(id);
    res.status(200).send(response);
  } catch (error: unknown) {
    res.status(500).send({
      error:
        error instanceof Error ? error.message : "An unknown error occurred"
    });
  }
};

export const createNewCharacterBuild = async (
  req: Request<object, object, CreateNewCharacterBuildInput>,
  res: Response
) => {
  const {
    characterId,
    buildName,
    lastUpdatedPatch,
    mainStats,
    subStats,
    talentPriority,
    notes,
    artifactNotes,
    statNotes,
    talentNotes,
    weaponNotes,
    weapons,
    artifacts
  } = req.body;

  try {
    const response = await characterBuildService.createCharacterBuild({
      authorId: "a25cb560-87fb-49cf-9589-336c6a7a3e47",
      characterId,
      buildName,
      lastUpdatedPatch,
      mainStats,
      subStats,
      talentPriority,
      notes,
      artifactNotes,
      statNotes,
      talentNotes,
      weaponNotes,
      weapons,
      artifacts
    });
    res.status(201).send(response);
  } catch (error: unknown) {
    res.status(500).send({
      error:
        error instanceof Error ? error.message : "An unknown error occurred"
    });
  }
};
