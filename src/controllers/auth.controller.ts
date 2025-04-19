import type { Request, Response } from "express";

import { db, supabase } from "../db/db.client";
import { UserService } from "../services/user.service";
import { EUserRole } from "../types/database.types";

const userService = new UserService(db);

export const registerUser = async (
  req: Request<
    {},
    {},
    {
      email: string;
      password: string;
    },
    {}
  >,
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
    } catch (error: any) {
      res.status(500).send({ error: error.message });
    }
  }
};

export const loginWithEmailPassword = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    res.status(401).send({ error: error.message });
  }

  if (data.user) {
    const userProfile = await userService.getUserProfile(data.user.id);

    res.status(200).send({
      user: data.user,
      session: data.session,
      profile: userProfile
    });
  }
};
