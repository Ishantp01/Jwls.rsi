import { Injectable, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {Model} from 'mongoose';

import { Shop, shopDocument } from './schemas/shop.schema.js';
import { CreateShopDto } from './dto/create-dhop.dto.js';


@Injectable()
export class ShopService {
    constructor(@InjectModel(Shop.name) private shopModel: Model<shopDocument>) {}

    async findBySubdomain(subDomainorDomain: string) {
    return this.shopModel.findOne({
        $or: [
            {subDomain: subDomainorDomain.toLowerCase()},
            {customDomain: subDomainorDomain.toLowerCase() },
        ],
    })
    .lean();
    }

    async createShop(dto: CreateShopDto) {
        const normalizedSubDomain = dto.subDomain.toLowerCase().replace(/[^a-z0-9-]/g, '');
        const exists = await this.findBySubdomain(normalizedSubDomain);

        if(exists) throw new ConflictException('Shop with this subDomain or custom domain already exists');

        const create = new this.shopModel({
            ...dto,
            subDomain: normalizedSubDomain,
        });

        return create.save();
    }

    async listAll() {
        return this.shopModel.find().lean();
    } 

    async findById(id: string) {
        return this.shopModel.findById(id).lean();
    }

    async updateStatus(id: string, status: string) {
        return this.shopModel.findByIdAndUpdate(id, {status}, {new: true}).lean();
    } 
}
