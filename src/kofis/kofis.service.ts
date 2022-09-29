import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { KofiPurchase, KofiPurchaseDocuemnt } from 'src/schemas/kofi.schema';
import { CreateKofiDto } from './dto/create-kofi.dto';
import { UpdateKofiDto } from './dto/update-kofi.dto';
import { Kofi } from './entities/kofi.entity';

@Injectable()
export class KofisService {
  constructor(
    @InjectModel(KofiPurchase.name)
    private readonly dbKofi: Model<KofiPurchaseDocuemnt>,
  ) {}
  async savePurchaseDone(dto: Kofi) {
    try {
      await this.dbKofi.create(dto);
    } catch (error) {
      throw error;
    }
  }
}
