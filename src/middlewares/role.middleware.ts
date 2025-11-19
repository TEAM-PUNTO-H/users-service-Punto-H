import { Request, Response, NextFunction } from "express";

export const authorizeRoles = (...allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const userRole = req.user?.rol;

    if (!userRole) {
      return res.status(401).json({ message: "Usuario no autenticado" });
    }

    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({ message: "No tienes permiso para acceder a este recurso" });
    }

    next();
  };
};