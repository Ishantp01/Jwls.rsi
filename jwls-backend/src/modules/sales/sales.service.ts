import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Sale, SaleDocument } from './schemas/sale.schema';
import { Payment, PaymentDocument } from './schemas/payment.schema';

@Injectable()
export class SalesService {
  constructor(
    @InjectModel(Sale.name) private saleModel: Model<SaleDocument>,
    @InjectModel(Payment.name) private paymentModel: Model<PaymentDocument>,
  ) {}

  async create(createSaleDto: any): Promise<Sale> {
    const sale = new this.saleModel(createSaleDto);
    return sale.save();
  }

  async findAll(shopId: string): Promise<Sale[]> {
    return this.saleModel.find({ shopId }).populate('customerId').exec();
  }

  async findOne(id: string): Promise<Sale> {
    return this.saleModel.findById(id).populate('customerId').exec();
  }

  async createPayment(createPaymentDto: any): Promise<Payment> {
    const payment = new this.paymentModel(createPaymentDto);
    return payment.save();
  }
}

