import { Router } from "express";
import { validateRequest } from "zod-express-middleware";

import { getAllEvents } from "../controllers/events.controller";
import { getEventsSchema } from "../schema/event.schema";

const router = Router();

router.get("/all", validateRequest(getEventsSchema), getAllEvents);

export default router;
