import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PaginationModule } from 'src/pagination/pagination.module';
import { Album, AlbumSchema } from 'src/schemas/albums.schema';
import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';
import { Photos, PhotosSchema } from 'src/schemas/photos.schema';
import { KofiPurchase, KofiPurchaseSchema } from 'src/schemas/kofi.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Album.name,
        schema: AlbumSchema,
      },
      {
        name: Photos.name,
        schema: PhotosSchema,
      },
      {
        name: KofiPurchase.name,
        schema: KofiPurchaseSchema,
      },
    ]),
    PaginationModule,
  ],
  providers: [AlbumsService],
  exports: [AlbumsService],
  controllers: [AlbumsController],
})
export class AlbumsModule {}
