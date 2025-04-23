import type { Request, Response, NextFunction } from "express";
import { EUserRole } from "../types/database.types";

const roleHierarchy = {
  [EUserRole.REGULAR]: 1,
  [EUserRole.MOD]: 2,
  [EUserRole.ADMIN]: 3
};

export const hasPermission =
  (requiredRole: EUserRole) =>
  (req: Request, res: Response, next: NextFunction) => {
    const user = res.locals.user;
    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const userRoleLevel = roleHierarchy[user.role];
    const requiredRoleLevel = roleHierarchy[requiredRole];

    if (userRoleLevel < requiredRoleLevel) {
      return res.status(403).json({ error: "Forbidden" });
    }

    next();
  };
