import { Router } from "express";
import {
  registerUser,
  loginWithEmailPassword
} from "../controllers/auth.controller";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginWithEmailPassword);

export default router;
