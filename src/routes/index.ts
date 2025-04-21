import { Router } from "express";
import systemRoutes from "./system.routes";
import domainRoutes from "./domain.routes";
import codeRoutes from "./code.routes";
import abyssRoutes from "./abyss.routes";
import characterRoutes from "./character.routes";
import eventRoutes from "./event.routes";
import weaponRoutes from "./weapon.routes";
import artifactRoutes from "./artifact.routes";
import authRoutes from "./auth.routes";

const router = Router();

router.use("/system", systemRoutes);
router.use("/domains", domainRoutes);
router.use("/codes", codeRoutes);
router.use("/abyss", abyssRoutes);
router.use("/characters", characterRoutes);
router.use("/events", eventRoutes);
router.use("/weapons", weaponRoutes);
router.use("/artifacts", artifactRoutes);
router.use("/auth", authRoutes);

export default router;
