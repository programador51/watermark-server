import { Controller, Get, Param, Req, Res, Query } from '@nestjs/common';
import { Request, Response } from 'express';

import { AlbumsService } from './albums.service';

@Controller('albums')
export class AlbumsController {
  constructor(private readonly album: AlbumsService) {}

  @Get('/')
  async albums(@Req() req: Request, @Res() res: Response) {
    try {
      const albums = await this.album.getAlbums(1);
      return res.status(200).json(albums);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  @Get('/info-download/:uuid')
  async infoDownload(
    @Req() req: Request,
    @Res() res: Response,
    @Param() param: { uuid: string },
  ) {
    try {
      const purchaseInfo = await this.album.downloadInfo(param.uuid);

      return res.status(200).json(purchaseInfo);
    } catch (error) {
      return res.status(500).json({});
    }
  }

  @Get('/photos')
  async getPhotos(
    @Req() req: Request,
    @Res() res: Response,
    @Query() query: { url: string },
  ) {
    try {
      const names = await this.album.getUrlsToDownloadFromBlob(query.url);
      return res.status(200).json(names);
    } catch (error) {
      return res.status(500).json([]);
    }
  }
}
