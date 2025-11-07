import { Request } from 'express';

export interface RequestWithShop extends Request {
  shopId?: string;
  shop?: {
    id: string;
    subdomain: string;
    name: string;
  };
}

