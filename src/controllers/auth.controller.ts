import type { Request, Response } from "express";

import { db, supabase } from "../db/db.client";
import { UserService } from "../services/user.service";
import { EUserRole } from "../types/database.types";
import type {
  LoginWithEmailPasswordInput,
  RegisterUserInput
} from "../schema/auth.schema";

const userService = new UserService(db);

export const registerUser = async (
  req: Request<object, object, RegisterUserInput["body"]>,

  res: Response
) => {
  const { email, password } = req.body;
  const { data, error } = await supabase.auth.signUp({
    email,
    password
  });

  if (error) {
    res.status(400).send({ error: error.message });
  }

  if (data.user) {
    try {
      const response = await userService.createUserProfile(
        data.user.id,
        EUserRole.REGULAR
      );

      res.status(200).send({ user: data.user, profile: response });
    } catch (error: unknown) {
      res.status(500).send({
        error:
          error instanceof Error ? error.message : "An unknown error occurred"
      });
    }
  }
};

export const loginWithEmailPassword = async (
  req: Request<object, object, LoginWithEmailPasswordInput["body"]>,
  res: Response
) => {
  const { email, password } = req.body;

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    res.status(401).send({ error: "Invalid credentials" });
  }

  if (data.user) {
    const userProfile = await userService.getUserProfile(data.user.id);

    res.status(200).send({
      user: data.user,
      session: data.session,
      profile: userProfile
    });
  } else {
    res.status(401).send({ error: "User not found" });
  }
};
