import { NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

export class PaginationMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    if (!req.query.page || Number(req.query.page) < 1) {
      req.query.page = '1';
    }

    if (!req.query.limit) {
      req.query.page = '20';
    }

    next();
  }
}
