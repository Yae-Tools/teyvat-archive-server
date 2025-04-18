import Elysia, { t } from "elysia";
import {
  loginWithEmailPassword,
  registerUser
} from "../controllers/auth.controller";

export const authRoutes = async (app: Elysia) => {
  app.group("/auth", (auth) => {
    auth.post(
      "/login",
      async ({ body }) => {
        return loginWithEmailPassword(body);
      },
      {
        body: t.Object({
          email: t.String(),
          password: t.String()
        }),
        detail: {
          tags: ["Auth"],
          summary: "User Login",
          description: "Logs in a user with email and password",
          responses: {
            200: {
              description: "Login successful"
            }
          }
        }
      }
    );

    auth.post(
      "/register",
      async ({ body }) => {
        return registerUser(body);
      },

      {
        body: t.Object({
          email: t.String(),
          password: t.String()
        }),
        detail: {
          tags: ["Auth"],
          summary: "User Registration",
          description: "Registers a new user with email and password",
          responses: {
            200: {
              description: "Registration successful"
            }
          }
        }
      }
    );

    return auth;
  });
  return Promise.resolve(app);
};
