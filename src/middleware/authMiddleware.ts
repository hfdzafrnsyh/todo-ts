import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

interface AuthRequest extends Request {
  user?: string | JwtPayload;
}

const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(' ')[1];
    const secret = process.env.SECRET!;
  
    if (!token) {
      res.status(401).json({ error: 'Unauthorized: Token not provided' });
      return;
    }

  try {
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    next(); 
  } catch (err) {
    res.status(401).json({ error: 'Unauthorized: Invalid or expired token' });
    return;
  }
};

export default authMiddleware;



