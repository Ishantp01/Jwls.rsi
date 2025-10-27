import {Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Role } from '../../common/enums/role.enum.js';

@Schema({timestamps: true})
export class User extends Document {
    @Prop({required: true, unique: true})
    name: string;

    @Prop({required: true, unique: true})
    email: string;

    @Prop({required: true})
    password: string;

    @Prop({required: true, enum: Role, default: Role.JEWELER})
    role: Role   
}

export const UserSchema = SchemaFactory.createForClass(User);