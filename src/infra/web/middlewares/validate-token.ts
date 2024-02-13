import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { env } from '@/infra/config/env';

export interface CustomRequest extends Request {
  accountId: string;
}

export function validateToken(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).send({
      error: 'Token not provided.',
    });
  }

  try {
    const payload = verify(token, env.JWT_SECRET);

    (req as CustomRequest).accountId = String(payload.sub);

    next();
  } catch {
    return res.status(401).send({
      error: 'Invalid token.',
    });
  }
}
