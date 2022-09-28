/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PhotosDocument = Photos & Document;

@Schema()
export class Photos {
  /**
   * Id of the album which belongs that photo
   */
  @Prop({
    required: true,
  })
  idAlbum: string;

  /**
   * Link of the kofi link shop in order to get that picture. Can work as secondary primary key
   */
  @Prop({
    required: false,
  })
  kofiLinkShop: string;

  /**
   * Filename of the zip on the blob storage
   */
  @Prop({
    required: true,
  })
  filename: string;
}

export const PhotosSchema = SchemaFactory.createForClass(Photos);
