import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class TenantGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const shopId = request.headers['x-shop-id'] || request.shop?.id;

    if (!shopId) {
      throw new UnauthorizedException('Shop context is required');
    }

    request.shopId = shopId;
    return true;
  }
}

