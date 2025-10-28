import type { NextFunction, Request, Response } from 'express';

const AUTH_TOKEN = process.env.AUTH_TOKEN || 'tokensuperseguro12314';

export function auth(req: Request, res: Response, next: NextFunction) {
   const _token = req.headers['authorization'];

   if (!_token || _token.replace('Bearer ', '') != AUTH_TOKEN)
      return res.status(401).json({ message: 'Token inválido' });
   next();
}
