/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AlbumDocument = Album & Document;

@Schema()
export class Album {
  @Prop({
    required: true,
  })
  kofiLinkShop: string;

  /**
   * Number of photos that contains the album
   */
  @Prop({
    required: true,
  })
  photos: number;

  /**
   * Title of the album, this will be the name to put on the files that the customers will download
   */
  @Prop({
    required: true,
  })
  title: string;
}

export const AlbumSchema = SchemaFactory.createForClass(Album);
