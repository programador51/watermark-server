import { Injectable } from '@nestjs/common';
import { Deta } from 'deta';
import { ParamsDownload, ParamsUpload } from './deta.interface';

@Injectable()
export class DetaService {
  private deta = Deta(process.env.DETA_DRIVE_KEY);

  async upload({ drivename, file, options }: ParamsUpload): Promise<string> {
    try {
      const query = this.deta.Drive(drivename);
      const insertedFile = await query.put(file, options);
      return insertedFile;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async download({ drivename, filename }: ParamsDownload): Promise<Buffer> {
    try {
      const query = this.deta.Drive(drivename);
      const file = await query.get(filename);
      const arrayBuffer = await file.arrayBuffer();
      return Buffer.from(arrayBuffer);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
