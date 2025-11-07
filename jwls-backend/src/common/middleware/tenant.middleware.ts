import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class TenantMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const shopId = req.headers['x-shop-id'] as string;
    
    if (shopId) {
      req['shopId'] = shopId;
    }

    next();
  }
}

