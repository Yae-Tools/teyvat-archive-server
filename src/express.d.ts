import type { IUserProfile } from "./types/database.types";

declare module "express" {
  interface Response {
    locals: {
      user?: IUserProfile;
    };
  }
}
