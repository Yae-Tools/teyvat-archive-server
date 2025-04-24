import { Router } from "express";
import { validateRequest } from "zod-express-middleware";

import {
  registerUser,
  loginWithEmailPassword,
  getUserProfile
} from "../controllers/auth.controller";
import {
  loginWithEmailPasswordSchema,
  registerUserSchema
} from "../schema/auth.schema";
import { requireUser } from "../middleware/requireUser";
const router = Router();

router.post("/register", validateRequest(registerUserSchema), registerUser);
router.post(
  "/login",
  validateRequest(loginWithEmailPasswordSchema),
  loginWithEmailPassword
);
router.get("/profile", [requireUser], getUserProfile);

export default router;
