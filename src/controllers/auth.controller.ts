import { db, supabase } from "../db/db.client";
import { UserService } from "../services/user.service";
import { EUserRole } from "../types/database.types";

export const registerUser = async (body: {
  email: string;
  password: string;
}) => {
  const { data, error } = await supabase.auth.signUp(body);

  if (error) {
    console.error("Error registering user", error);
    throw new Error("Error registering user");
  }

  if (data.user) {
    const userService = new UserService(db);

    try {
      const response = await userService.createUserProfile(
        data.user.id,
        EUserRole.REGULAR
      );
      console.log(response);

      return {
        user: data.user,
        profile: response
      };
    } catch (error) {
      console.error("Error creating user profile", error);
      throw new Error("Error creating user profile");
    }
  }
};

export const loginWithEmailPassword = async (body: {
  email: string;
  password: string;
}) => {
  const { data, error } = await supabase.auth.signInWithPassword(body);

  if (error) {
    console.error("Error logging in user", error);
    throw new Error(error.message);
  }

  return data.user;
};
