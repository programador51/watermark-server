import { Injectable } from '@nestjs/common';
import * as Minizip from 'minizip-asm.js';

@Injectable()
export class ZipService {
  private reverseFileName(str: string) {
    // Step 1. Use the split() method to return a new array
    const splitString = str.split(''); // var splitString = "hello".split("");
    // ["h", "e", "l", "l", "o"]

    // Step 2. Use the reverse() method to reverse the new created array
    const reverseArray = splitString.reverse(); // var reverseArray = ["h", "e", "l", "l", "o"].reverse();
    // ["o", "l", "l", "e", "h"]

    // Step 3. Use the join() method to join all elements of the array into a string
    const joinArray = reverseArray.join(''); // var joinArray = ["o", "l", "l", "e", "h"].join("");
    // "olleh"

    //Step 4. Return the reversed string
    return joinArray; // "olleh"
  }

  /**
   * Compress a file, get as well his password
   * @param name - Name of the file to compress
   * @param file - Buffer of the file got/readed from somewhere
   * @param uuid - UUID generated in order to put as file name on the zip once it's saved on disk
   */
  compress(name: string, file: Buffer, uuid: string) {
    const mz = new Minizip();

    try {
      const password = this.reverseFileName(uuid);

      mz.append(name, file, { password });

      const zipped = new Buffer(mz.zip());

      return {
        zipped,
        password,
      };
    } catch (error) {
      console.log(error);
    }
  }
}
