// import { FileReader } from './file-reader.interface.js';
// import { readFileSync } from 'node:fs';
// import { RentalOffer, City, RentalType, RentalAmenities, UserType } from '../../types/index.js';

// export class TSVFileReader implements FileReader {
//   private rawData = '';

//   constructor(
//     private readonly filename: string
//   ) {}

//   public read(): void {
//     this.rawData = readFileSync(this.filename, { encoding: 'utf-8' });
//   }

//   public toArray(): RentalOffer[] {
//     if (!this.rawData) {
//       throw new Error('File was not read');
//     }

//     return this.rawData
//       .split('\n')
//       .filter((row) => row.trim().length > 0)
//       .map((line) => line.split('\t'))
//       .map(([title, info, date, city, preview, photos, premium, favorite, rating, type, rooms, guests, price, amenities, name, email, avatar, password, userType, coordinates]) => ({
//         title,
//         info,
//         date: new Date(date),
//         city: city as City,
//         preview,
//         photos: photos.split(';'),
//         premium: premium.toLowerCase() === 'true',
//         favorite: favorite.toLowerCase() === 'true',
//         rating: Number.parseInt(rating, 10),
//         type: type as RentalType,
//         rooms: Number.parseInt(rooms, 10),
//         guests: Number.parseInt(guests, 10),
//         price: Number.parseInt(price, 10),
//         amenities: amenities
//           .split(';')
//           .map((amenity) => amenity as RentalAmenities),
//         renter: {
//           name,
//           email,
//           avatar,
//           password,
//           type: userType as UserType
//         },
//         countComments: 0,
//         coordinates: coordinates.split(';').map((coordinate) => Number.parseFloat(coordinate)),
//       }));
//   }
// }

import EventEmitter from 'node:events';
import { createReadStream } from 'node:fs';
import { FileReader } from './file-reader.interface.js';

const CHUNK_SIZE = 16384; // 16KB

export class TSVFileReader extends EventEmitter implements FileReader {
  constructor(private readonly filename: string) {
    super();
  }

  public async read(): Promise<void> {
    const readStream = createReadStream(this.filename, {
      highWaterMark: CHUNK_SIZE,
      encoding: 'utf-8',
    });

    let remainingData = '';
    let nextLinePosition = -1;
    let importedRowCount = 0;

    for await (const chunk of readStream) {
      remainingData += chunk.toString();

      while ((nextLinePosition = remainingData.indexOf('\n')) >= 0) {
        const completeRow = remainingData.slice(0, nextLinePosition + 1);
        remainingData = remainingData.slice(++nextLinePosition);
        importedRowCount++;

        this.emit('line', completeRow);
      }
    }

    this.emit('end', importedRowCount);
  }
}
