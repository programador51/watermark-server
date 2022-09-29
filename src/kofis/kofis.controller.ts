import { Controller, Post, Req, Res, HttpStatus } from '@nestjs/common';
import { KofisService } from './kofis.service';

import { EmailService } from 'src/email/email.service';
import { Request, Response } from 'express';
import { Kofi } from 'src/kofi.interface';

@Controller('kofis')
export class KofisController {
  constructor(
    private readonly kofisService: KofisService,
    private readonly email: EmailService,
  ) {}

  @Post()
  async purchase(@Req() req: Request, @Res() res: Response) {
    const dto: Kofi = JSON.parse(req.body.data);

    const isValidToken = dto['verification_token'] === process.env.KOFI_TOKEN;

    if (!isValidToken)
      return res.status(HttpStatus.FORBIDDEN).json({
        message: 'Purchase not valid',
      });

    try {
      await this.kofisService.savePurchaseDone(dto);

      await this.email.sendPurchaseConfirmation(
        {
          amount: dto.amount,
          currency: dto.currency,
          customerEmail: dto.email,
          customerName: dto.from_name,
          password: dto.kofi_transaction_id,
          title: dto.type,
        },
        {
          to: dto.email,
          subject: `Files to download the set`,
        },
      );

      return res.status(HttpStatus.OK).json({
        message: 'Purchase registered and email sent',
      });
      // await this.email.sendPurchaseConfirmation({})
    } catch (error) {
      console.log(error);
      return res.status(HttpStatus.BAD_GATEWAY).json({
        message: 'Ups, the server is down, try later :(',
      });
    }
  }

  @Post('/:email')
  async password(@Req() req: Request, @Res() res: Response) {}
}
