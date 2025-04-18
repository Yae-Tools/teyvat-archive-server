import { supabase } from "../db/dbClient";

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
    const { error: profileError } = await supabase
      .from("user_profiles")
      .insert({
        id: data.user.id,
        email: body.email,
        role: "user"
      });

    if (profileError) {
      console.error("Error creating user profile", profileError);
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
