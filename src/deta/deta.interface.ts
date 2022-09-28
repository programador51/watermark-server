import { PutOptions } from 'deta/dist/types/types/drive/request';

export interface ParamsUpload {
  /**
   * @example
   * 'photos'
   */
  drivename: string;
  file: string;
  options: PutOptions;
}

export interface ParamsDownload {
  drivename: string;
  /**
   * @example
   * 'mySecretList.txt'
   */
  filename: string;
}
