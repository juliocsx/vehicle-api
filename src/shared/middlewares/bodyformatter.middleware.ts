import { NestMiddleware } from '@nestjs/common';
import { NextFunction, Response } from 'express';

export class BodyFormatter implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { body, method } = req;

    if (method === 'POST' || method === 'PATCH') {
      for (const key in body) {
        if (typeof body[key] === 'string') {
          body[key] = body[key].trim();
        }

        if (typeof body[key] === 'string' && body[key] === '') {
          body[key] = null;
        }

        if (typeof body[key] === 'string' && body[key] === 'true') {
          body[key] = true;
        }

        if (typeof body[key] === 'string' && body[key] === 'false') {
          body[key] = false;
        }
      }
    }
    
    next();
  }
}
