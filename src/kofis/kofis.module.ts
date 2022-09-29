import { Module } from '@nestjs/common';
import { KofisService } from './kofis.service';
import { KofisController } from './kofis.controller';
import { EmailService } from 'src/email/email.service';
import { MongooseModule } from '@nestjs/mongoose';
import { KofiPurchase, KofiPurchaseSchema } from 'src/schemas/kofi.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: KofiPurchase.name,
        schema: KofiPurchaseSchema,
      },
    ]),
  ],
  controllers: [KofisController],
  providers: [KofisService, EmailService],
})
export class KofisModule {}
