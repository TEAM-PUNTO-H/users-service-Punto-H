import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWTSECRET = process.env.JWT_SECRET as string;


export const verifyJwt = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies?.accessToken;
  if (!token) return res.status(401).json({ error: "Token requerido" });
  
  try {
    const decoded = jwt.verify(token, JWTSECRET,{algorithms: ['HS256']});
    if (typeof decoded === "string") return res.status(403).json({ error: "Token inválido" });
    
    req.user = decoded;
    next();
    return decoded;
  } catch (error: any) {
  if (error.name === "TokenExpiredError") {
    return res.status(401).json({ error: "Token expirado" });
  }
  return res.status(403).json({ error: "Token inválido" });
  }
};

export const generateToken = (email: string, role: string, userId: string)=>{
  const issuedAt = Math.floor(Date.now() / 1000);
  const expiresAt = process.env.JWT_ACCESS_EXPIRES_IN  ?? 3600;
  const payload = {
    userId: userId,
    email: email,
    rol: role,
    iat: issuedAt,
    exp: issuedAt + (typeof expiresAt === 'string' ? parseInt(expiresAt) * 60 * 60 : expiresAt),
  }

  const token = jwt.sign(payload, JWTSECRET, { algorithm: 'HS256'});
  return token;
};


