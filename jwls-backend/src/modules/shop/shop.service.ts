import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Shop, ShopDocument } from './schemas/shop.schema';
import { CreateShopDto } from './dto/create-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';

@Injectable()
export class ShopService {
  constructor(@InjectModel(Shop.name) private shopModel: Model<ShopDocument>) {}

  async create(createShopDto: CreateShopDto): Promise<Shop> {
    const createdShop = new this.shopModel(createShopDto);
    return createdShop.save();
  }

  async findAll(): Promise<Shop[]> {
    return this.shopModel.find().exec();
  }

  async findOne(id: string): Promise<Shop> {
    const shop = await this.shopModel.findById(id).exec();
    if (!shop) {
      throw new NotFoundException(`Shop with ID ${id} not found`);
    }
    return shop;
  }

  async findBySubdomain(subdomain: string): Promise<Shop> {
    const shop = await this.shopModel.findOne({ subdomain }).exec();
    if (!shop) {
      throw new NotFoundException(`Shop with subdomain ${subdomain} not found`);
    }
    return shop;
  }

  async update(id: string, updateShopDto: UpdateShopDto): Promise<Shop> {
    const updatedShop = await this.shopModel
      .findByIdAndUpdate(id, updateShopDto, { new: true })
      .exec();
    if (!updatedShop) {
      throw new NotFoundException(`Shop with ID ${id} not found`);
    }
    return updatedShop;
  }

  async remove(id: string): Promise<void> {
    const result = await this.shopModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Shop with ID ${id} not found`);
    }
  }
}

