import { Router } from "express";
import { validateRequest } from "zod-express-middleware";

import {
  registerUser,
  loginWithEmailPassword
} from "../controllers/auth.controller";
import {
  loginWithEmailPasswordSchema,
  registerUserSchema
} from "../schema/auth.schema";

const router = Router();

router.post("/register", validateRequest(registerUserSchema), registerUser);
router.post(
  "/login",
  validateRequest(loginWithEmailPasswordSchema),
  loginWithEmailPassword
);

export default router;
