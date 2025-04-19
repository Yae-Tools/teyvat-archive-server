import { Router } from "express";
import { getDailyDomainData } from "../controllers/domains.controller";

const router = Router();

router.get("/daily", getDailyDomainData);

export default router;
