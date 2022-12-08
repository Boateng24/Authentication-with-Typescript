import { Request, Response, NextFunction } from 'express';
import { originVal } from '../helpers/allowedOrigins';

export const credentials = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const origin = req.headers.origin as string;
  if (originVal.includes(origin)) {
    res.header('Access-Control-Allow-Credentials', 'true');
  }
  next();
};
