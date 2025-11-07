import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { ShopService } from './shop.service.js';

@Controller('admin/shop')
export class ShopController {
    constructor(private readonly shopService: ShopService) {}


}
