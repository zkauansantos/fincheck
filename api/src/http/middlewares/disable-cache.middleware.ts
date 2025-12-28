import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class DisableCacheMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    res.setHeader(
      'Cache-Control',
      'no-store, no-cache, must-revalidate, private',
    );
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');

    next();
  }
}
