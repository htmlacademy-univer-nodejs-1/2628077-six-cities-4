import { City, RentalType, RentalAmenities } from '../../../types/index.js';

export class CreateOfferDto {
  public title: string;
  public info: string;
  public date: Date;
  public city: City;
  public preview: string;
  public photos: string[];
  public premium: boolean;
  public favorite: boolean;
  public rating: number;
  public type: RentalType;
  public rooms: number;
  public guests: number;
  public price: number;
  public amenities: RentalAmenities[];
  public userId: string;
  public coordinates: number[];
}
