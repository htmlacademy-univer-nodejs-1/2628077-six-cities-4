import { City } from './city.enum.js';
import { RentalType } from './rental-type.enum.js';
import { RentalAmenities } from './rental-amenities.enum.js';
import { User } from './user.type.js';

export type RentalOffer = {
  title: string;
  info: string;
  date: Date;
  city: City;
  preview: string;
  photos: string[];
  premium: boolean;
  favorite: boolean;
  rating: number;
  type: RentalType;
  rooms: number;
  guests: number;
  price: number;
  amenities: RentalAmenities[];
  renter: User;
  countComments: number;
  coordinates: number[];
}
