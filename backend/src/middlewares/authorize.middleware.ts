// src/middlewares/authorize.middleware.ts
import { Request, Response, NextFunction } from 'express';

// Middleware que verifica si el usuario tiene uno de los roles permitidos
export const authorize = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user;
    if (!user || !roles.includes(user.role)) {
      return res.status(403).json({ message: 'Acceso denegado: rol insuficiente' });
    }
    next();
  };
};
