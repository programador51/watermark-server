import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { DetaService } from 'src/deta/deta.service';
import { ZipService } from 'src/zip/zip.service';
import { MongooseModule } from '@nestjs/mongoose';

import { AlbumsModule } from 'src/albums/albums.module';
import { Photos, PhotosSchema } from 'src/schemas/photos.schema';

@Module({
  imports: [
    AlbumsModule,
    MongooseModule.forFeature([
      {
        name: Photos.name,
        schema: PhotosSchema,
      },
    ]),
  ],
  controllers: [FilesController],
  providers: [FilesService, DetaService, ZipService],
})
export class FilesModule {}
