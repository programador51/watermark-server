import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PaginationService } from 'src/pagination/pagination.service';
import { Album, AlbumDocument } from 'src/schemas/albums.schema';
import { KofiPurchase, KofiPurchaseDocuemnt } from 'src/schemas/kofi.schema';
import { Photos, PhotosDocument } from 'src/schemas/photos.schema';

@Injectable()
export class AlbumsService {
  constructor(
    @InjectModel(Album.name) private albumModel: Model<AlbumDocument>,
    @InjectModel(Photos.name) private photosModel: Model<PhotosDocument>,
    @InjectModel(KofiPurchase.name) private kofi: Model<KofiPurchaseDocuemnt>,
    private pagination: PaginationService,
  ) {}

  async createAlbum(kofiShopLink: string, title: string) {
    const album = await this.albumModel.create({
      kofiLinkShop: kofiShopLink,
      photos: 0,
      title,
    });

    return album;
  }

  /**
   * Increase the number of photos that has an album of the creator
   * @param kofiLinkShop - Link of the kofi shop
   * @param by - Number of increase
   */
  async increasePhotosOfAlbumBy(kofiLinkShop: string, by = 1) {
    await this.albumModel.updateOne(
      { kofiLinkShop },
      {
        $inc: {
          photos: by,
        },
      },
    );
  }

  async checkIfAlbumAlreadyExists(
    kofiShopLink: string,
  ): Promise<false | string | number> {
    const album = await this.albumModel.findOne({
      kofiLinkShop: kofiShopLink,
    });

    console.log('album searched', album);

    if (!album) return false;
    return album['_id'];
  }

  async getAlbums(page: number) {
    const { limit, skip } = this.pagination.get(page);

    const albums = await this.albumModel.find().skip(skip).limit(limit);
    return albums;
  }

  /**
   * Get the information of the download info according the purchase paypal id
   * @param uuid - UUID of the paypal transaction
   */
  async downloadInfo(uuid: string) {
    const purchase = await this.kofi.findOne({
      kofi_transaction_id: uuid,
    });

    if (purchase) {
      const querys = purchase['shop_items'].map((item) =>
        this.albumModel
          .findOne({
            kofiLinkShop: `https://ko-fi.com/s/${item['direct_link_code']}`,
          })
          .then((album) => album),
      );

      const albumsBought = await Promise.all(querys);
      return albumsBought;
    }

    return [];
  }

  /**
   * Get the filenames of the photos uploaded to the kofi item
   * @param kofiLinkShop - Kofi link shop
   * @returns {Promise<string[]>}
   * @example
   * //...
   * await this.getUrlsToDownloadFromBlob('https://ko-fi.com/s/1f5s3eca9b6d'); // ['one.zip','two.zip']
   * //...
   */
  async getUrlsToDownloadFromBlob(
    kofiLinkShop: string,
  ): Promise<string[] | any> {
    const fileNames = await this.photosModel.find(
      {
        kofiLinkShop,
      },
      { filename: 1, ['_id']: 0 },
    );

    const parsed = fileNames.map((record) => record.filename);

    return parsed;
  }
}
