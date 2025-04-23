import type { Request, Response, NextFunction } from "express";
import { supabase } from "../db/db.client";

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
    res.locals.user = user;
    next();
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
};
