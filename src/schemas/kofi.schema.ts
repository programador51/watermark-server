/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Payment, ShopItemI } from 'src/kofi.interface';

export type KofiPurchaseDocuemnt = KofiPurchase & Document;

@Schema()
export class KofiPurchase {
  @Prop({
    unique: true,
    required: true,
  })
  message_id: string;

  @Prop({
    unique: true,
    required: true,
  })
  kofi_transaction_id: string;

  @Prop({
    required: true,
  })
  timestamp: string;

  @Prop({
    required: true,
  })
  type: Payment;

  @Prop({
    required: true,
  })
  is_public: boolean;

  @Prop({
    required: true,
  })
  from_name: string;

  @Prop({
    required: false,
  })
  message: string;

  @Prop({
    required: true,
  })
  amount: string;

  @Prop({
    required: true,
  })
  url: string;

  @Prop({
    required: true,
  })
  email: string;

  @Prop({
    required: true,
  })
  currency: string;

  @Prop({
    required: true,
  })
  is_subscription_payment: boolean;

  @Prop({
    required: true,
  })
  is_first_subscription_payment: boolean;

  @Prop({
    required: true,
  })
  verification_token: string;

  @Prop({
    required: false,
  })
  shop_items: ShopItemI[];

  @Prop({
    required: false,
  })
  tier_name: string;

  @Prop({
    required: false,
  })
  urlDownload: string;

  @Prop({
    required: false,
  })
  passwordDownload: string;
}

export const KofiPurchaseSchema = SchemaFactory.createForClass(KofiPurchase);
