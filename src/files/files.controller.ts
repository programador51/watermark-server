import {
  Controller,
  Get,
  Post,
  Query,
  Req,
  Res,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { FilesService } from './files.service';
import { DetaService } from 'src/deta/deta.service';
import { Request, Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { ZipService } from 'src/zip/zip.service';
import { CreateFileDto } from './dto/create-file.dto';

@Controller('files')
export class FilesController {
  constructor(
    private readonly deta: DetaService,
    private readonly zip: ZipService,
    private readonly filesService: FilesService,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async storeFile(
    @Req() req: Request,
    @Res() res: Response,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const dto: CreateFileDto = JSON.parse(req.body.data);

    const uuid = uuidv4();
    const newFileName = `${uuid}.zip`;

    const { zipped } = this.zip.compress(file.originalname, file.buffer, uuid);

    await this.filesService.addTemporaryAlbumRequest(
      dto.kofiLink,
      dto.title,
      newFileName,
    );

    const lastSlashLink = dto.kofiLink.lastIndexOf('/');
    const drivename = dto.kofiLink.substring(
      lastSlashLink + 1,
      dto.kofiLink.length,
    );

    try {
      await this.deta.upload({
        drivename,
        file: newFileName,
        options: {
          contentType: 'application/zip',
          data: zipped,
        },
      });
      return res.status(200).send({ message: 'File uploaded' });
    } catch (error) {
      return res.status(500).json({
        message: `${error.message}. Try later`,
      });
    }
  }

  @Get('/:storelink')
  async getFile(@Req() req: Request, @Res() res: Response) {
    const { storelink } = req.params;

    try {
      const zippedDownloaded = await this.deta.download({
        drivename: 'photos',
        filename: storelink,
      });

      return res
        .status(200)
        .header({
          'Content-Type': 'application/zip',
        })
        .send(zippedDownloaded);
    } catch (error) {
      return res.status(500).json({
        message: `Couldn't retrieve the files from the shop. Try later`,
      });
    }
  }

  @Get('/download/album')
  async download(
    @Req() req: Request,
    @Res() res: Response,
    @Query() query: { drivename: string; filename: string },
  ) {
    try {
      const file = await this.deta.download({
        drivename: query.drivename,
        filename: query.filename,
      });

      return res
        .status(200)
        .set({
          'Content-Type': 'application/zip',
        })
        .send(file);
    } catch (error) {
      return res.status(500).send(null);
    }
  }
}
