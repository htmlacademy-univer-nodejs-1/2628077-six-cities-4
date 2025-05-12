import { City, RentalType, RentalAmenities } from '../../../types/index.js';
import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsEnum,
  IsMongoId,
  IsNumber,
  Max,
  MaxLength,
  Min,
  MinLength
} from 'class-validator';
import {CreateOfferValidationMessage} from './create-offer.messages.js';

export class CreateOfferDto {
  @MinLength(10, {message: CreateOfferValidationMessage.title.minLength})
  @MaxLength(100, {message: CreateOfferValidationMessage.title.maxLength})
  public title: string;

  @MinLength(20, {message: CreateOfferValidationMessage.info.minLength})
  @MaxLength(1024, {message: CreateOfferValidationMessage.info.maxLength})
  public info: string;

  @IsDateString({}, {message: CreateOfferValidationMessage.date.invalidFormat})
  public date: Date;

  @IsEnum(City, {message: CreateOfferValidationMessage.city.invalid})
  public city: City;

  public preview: string;

  @IsArray({message: CreateOfferValidationMessage.photos.invalidFormat})
  public photos: string[];

  @IsBoolean({message: CreateOfferValidationMessage.premium.invalidFormat})
  public premium: boolean;

  @IsBoolean({message: CreateOfferValidationMessage.favorite.invalidFormat})
  public favorite: boolean;

  @Min(1, {message: CreateOfferValidationMessage.rating.minValue})
  @Max(5, {message: CreateOfferValidationMessage.rating.maxValue})
  @IsNumber({maxDecimalPlaces: 1}, {message: CreateOfferValidationMessage.rating.invalidFormat})
  public rating: number;

  @IsEnum(RentalType, {message: CreateOfferValidationMessage.type.invalid})
  public type: RentalType;

  @Min(1, {message: CreateOfferValidationMessage.rooms.minValue})
  @Max(8, {message: CreateOfferValidationMessage.rooms.maxValue})
  @IsNumber({}, {message: CreateOfferValidationMessage.rooms.invalidFormat})
  public rooms: number;

  @Min(1, {message: CreateOfferValidationMessage.guests.minValue})
  @Max(10, {message: CreateOfferValidationMessage.guests.maxValue})
  @IsNumber({}, {message: CreateOfferValidationMessage.guests.invalidFormat})
  public guests: number;

  @Min(100, {message: CreateOfferValidationMessage.price.minValue})
  @Max(1000000, {message: CreateOfferValidationMessage.price.maxValue})
  @IsNumber({}, {message: CreateOfferValidationMessage.price.invalidFormat})
  public price: number;

  @IsArray({message: CreateOfferValidationMessage.amenities.invalidFormat})
  @IsEnum(RentalAmenities, {each: true, message: CreateOfferValidationMessage.amenities.invalidAmenityFormat})
  public amenities: RentalAmenities[];

  @IsMongoId({message: CreateOfferValidationMessage.userId.invalidId})
  public userId: string;

  @IsArray({message: CreateOfferValidationMessage.coordinates.invalidFormat})
  public coordinates: number[];
}
