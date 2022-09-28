import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { AlbumsService } from 'src/albums/albums.service';
import { Photos, PhotosDocument } from 'src/schemas/photos.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class FilesService {
  constructor(
    @InjectModel(Photos.name) private readonly photos: Model<PhotosDocument>,
    private readonly album: AlbumsService,
  ) {}

  /**
   * Use this if the album photos are JUST being created (not updated), since photos are being sended one by one on one by one request
   * @param kofiLinkShop - Link of the kofi shop
   * @param title - Title for the album
   * @example
   * //...
   * await addTemporaryAlbumRequest('https://ko-fi.com/s/1f5eca9b6d','Wow!Hot','e5fb5537-6e1b-4ea5-a07b-b7d8ee28feec.zip')
   * //...
   */
  async addTemporaryAlbumRequest(
    kofiLinkShop: string,
    title: string,
    nameZip: string,
  ) {
    let idAlbum: string | number;

    const albumAlreadyExists = await this.album.checkIfAlbumAlreadyExists(
      kofiLinkShop,
    );

    if (albumAlreadyExists === false) {
      const album = await this.album.createAlbum(kofiLinkShop, title);
      idAlbum = album['_id'];
    } else {
      idAlbum = albumAlreadyExists;
    }

    await Promise.all([
      this.photos.create({
        idAlbum,
        kofiLinkShop,
        filename: nameZip,
      }),
      this.album.increasePhotosOfAlbumBy(kofiLinkShop, 1),
    ]);
  }
}
