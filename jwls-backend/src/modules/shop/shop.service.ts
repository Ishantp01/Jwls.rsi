import { Injectable, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {Model} from 'mongoose';

import { Shop, shopDocument } from './schemas/shop.schema.js';
import { CreateShopDto } from './dto/create-dhop.dto.js';


@Injectable()
export class ShopService {
    constructor(@InjectModel(Shop.name) private shopModel: Model<shopDocument>) {}

    
     
}
