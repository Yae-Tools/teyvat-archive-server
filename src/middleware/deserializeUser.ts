import type { Request, Response, NextFunction } from "express";
import { db, supabase } from "../db/db.client";
import { UserService } from "../services/user.service";
export const deserializeUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken = req.headers.authorization;
  if (!accessToken) {
    return next();
  }

  const {
    data: { user }
  } = await supabase.auth.getUser(accessToken);

  if (user) {
    const userService = new UserService(db);

    const userProfile = await userService.getUserProfile(user.id);

    if (userProfile) {
      res.locals.user = userProfile;
    }

    next();
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
};
