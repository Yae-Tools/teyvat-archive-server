import type { Request, Response } from "express";

import { refetchEnkaCache } from "../services/enkaClient.service";
import {
  fetchHoyoGameRequest,
  fetchHoyoPlayRequest
} from "../services/system.service";
import { migrateToLatest } from "../db/db.migrator";
import { db } from "../db/db.client";

export const getGameVersion = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const [hoyoPlayResponse, hoyoGameResponse] = await Promise.all([
      fetchHoyoPlayRequest(),
      fetchHoyoGameRequest()
    ]);

    const hoyoPlayParsed = JSON.parse(hoyoPlayResponse ?? "{}");
    const hoyoGameParsed = JSON.parse(hoyoGameResponse ?? "{}");

    const games = hoyoGameParsed.data.games;

    const game = games.find(
      (game: { id: string }) => game.id === "gopR6Cufr3"
    ).display;

    res.status(200).send({
      version: hoyoPlayParsed.data.tag,
      build: hoyoPlayParsed.data.build_id,
      background: game.background.url,
      logo: game.logo.url
    });
  } catch (error: unknown) {
    res.status(500).send({ version: "Unknown", build: "", error: error });
  }
};

export const refetchCache = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    await refetchEnkaCache();
    res.status(200).send({ message: "Cache refetched successfully" });
  } catch (error) {
    console.error("Error refetching cache:", error);
    res.status(500).send({ error: "Failed to refetch cache" });
  }
};

export const runMigrations = async (req: Request, res: Response) => {
  try {
    await migrateToLatest();
    res.status(200).send({ message: "Migrations run successfully" });
  } catch (error) {
    console.error("Error running migrations:", error);
    res.status(500).send({ error: "Failed to run migrations" });
  }
};

export const resetMigrations = async (req: Request, res: Response) => {
  try {
    // Drop the kysely_migrations table to reset migration state
    await Promise.all([
      db.schema.dropTable("kysely_migration").execute(),
      db.schema.dropTable("kysely_migration_lock").execute()
    ]);
    console.log("Dropped kysely_migration tables");

    // Run migrations again
    await migrateToLatest();
    res
      .status(200)
      .send({ message: "Migrations reset and rerun successfully" });
  } catch (error) {
    console.error("Error resetting migrations:", error);
    res.status(500).send({ error: "Failed to reset migrations" });
  }
};
