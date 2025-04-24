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
  req: Request<object, object, RegisterUserInput>,

  res: Response
) => {
  const { email, password } = req.body;
  const { data, error } = await supabase.auth.signUp({
    email,
    password
  });

  if (error) {
    res.status(400).send({ message: error.message });
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
        message:
          error instanceof Error ? error.message : "An unknown error occurred"
      });
    }
  }
};

export const loginWithEmailPassword = async (
  req: Request<object, object, LoginWithEmailPasswordInput>,
  res: Response
) => {
  const { email, password } = req.body;

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    res.status(401).send({ message: "Invalid credentials" });
  }

  if (data.user) {
    const userProfile = await userService.getUserProfile(data.user.id);

    res.status(200).send({
      session: {
        accessToken: data.session?.access_token,
        refreshToken: data.session?.refresh_token,
        expiresAt: data.session?.expires_at,
        tokenType: data.session?.token_type
      },
      profile: {
        email: data.user.email,
        displayName: userProfile?.display_name,
        role: userProfile?.role,
        id: userProfile?.id,
        userId: userProfile?.user_id,
        createdAt: userProfile?.created_at,
        updatedAt: userProfile?.updated_at,
        profilePicture: userProfile?.profile_picture
      }
    });
  } else {
    res.status(401).send({ message: "User not found" });
  }
};

export const getUserProfile = async (req: Request, res: Response) => {
  const { user, token } = res.locals;

  const supabaseUser = await supabase.auth.getUser(token ?? "");
  const userProfile = await userService.getUserProfile(user?.user_id ?? "");

  if (!userProfile) {
    res.status(404).send({ message: "User profile not found" });
  }

  const formattedUserProfile = {
    email: supabaseUser.data.user?.email,
    displayName: userProfile?.display_name,
    role: userProfile?.role,
    id: userProfile?.id,
    userId: userProfile?.user_id,
    createdAt: userProfile?.created_at,
    updatedAt: userProfile?.updated_at,
    profilePicture: userProfile?.profile_picture
  };

  res.status(200).send(formattedUserProfile);
};
