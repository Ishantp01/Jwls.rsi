import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MaterialLot, MaterialLotDocument } from './schemas/material-lot.schema';
import { CreateMaterialDto } from './dto/create-material.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';

@Injectable()
export class MaterialService {
  constructor(
    @InjectModel(MaterialLot.name)
    private materialModel: Model<MaterialLotDocument>,
  ) {}

  async create(createMaterialDto: CreateMaterialDto): Promise<MaterialLot> {
    const material = new this.materialModel(createMaterialDto);
    return material.save();
  }

  async findAll(shopId: string): Promise<MaterialLot[]> {
    return this.materialModel.find({ shopId }).exec();
  }

  async findOne(id: string): Promise<MaterialLot> {
    const material = await this.materialModel.findById(id).exec();
    if (!material) {
      throw new NotFoundException(`Material with ID ${id} not found`);
    }
    return material;
  }

  async update(id: string, updateMaterialDto: UpdateMaterialDto): Promise<MaterialLot> {
    const material = await this.materialModel
      .findByIdAndUpdate(id, updateMaterialDto, { new: true })
      .exec();
    if (!material) {
      throw new NotFoundException(`Material with ID ${id} not found`);
    }
    return material;
  }

  async remove(id: string): Promise<void> {
    const result = await this.materialModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Material with ID ${id} not found`);
    }
  }
}

