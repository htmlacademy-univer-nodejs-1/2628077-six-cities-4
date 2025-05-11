import { City, RentalAmenities, RentalType } from '../../../types/index.js';

export class UpdateOfferDto {
  public title?: string;
  public info?: string;
  public date?: Date;
  public city?: City;
  public preview?: string;
  public photos?: string[];
  public premium?: boolean;
  public favorite?: boolean;
  public rating?: number;
  public type?: RentalType;
  public rooms?: number;
  public guests?: number;
  public price?: number;
  public amenities?: RentalAmenities;
  public coordinates?: number[];
}
