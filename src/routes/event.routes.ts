import { Router } from "express";
import { getAllEvents } from "../controllers/events.controller";

const router = Router();

router.get("/all", getAllEvents);

export default router;
