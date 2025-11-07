export interface JwtPayload {
  sub: string;
  email: string;
  shopId?: string;
  roles: string[];
  iat?: number;
  exp?: number;
}

