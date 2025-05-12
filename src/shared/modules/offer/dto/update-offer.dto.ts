import { City, RentalAmenities, RentalType } from '../../../types/index.js';
import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsEnum,
  IsNumber,
  Max,
  MaxLength,
  Min,
  MinLength,
  IsOptional
} from 'class-validator';
import {UpdateOfferValidationMessage} from './update-offer.messages.js';

export class UpdateOfferDto {
  @IsOptional()
  @MinLength(10, {message: UpdateOfferValidationMessage.title.minLength})
  @MaxLength(100, {message: UpdateOfferValidationMessage.title.maxLength})
  public title: string;

  @IsOptional()
  @MinLength(20, {message: UpdateOfferValidationMessage.info.minLength})
  @MaxLength(1024, {message: UpdateOfferValidationMessage.info.maxLength})
  public info: string;

  @IsOptional()
  @IsDateString({}, {message: UpdateOfferValidationMessage.date.invalidFormat})
  public date: Date;

  @IsOptional()
  @IsEnum(City, {message: UpdateOfferValidationMessage.city.invalid})
  public city: City;

  @IsOptional()
  public preview: string;

  @IsOptional()
  @IsArray({message: UpdateOfferValidationMessage.photos.invalidFormat})
  public photos: string[];

  @IsOptional()
  @IsBoolean({message: UpdateOfferValidationMessage.premium.invalidFormat})
  public premium: boolean;

  @IsOptional()
  @IsBoolean({message: UpdateOfferValidationMessage.favorite.invalidFormat})
  public favorite: boolean;

  @IsOptional()
  @Min(1, {message: UpdateOfferValidationMessage.rating.minValue})
  @Max(5, {message: UpdateOfferValidationMessage.rating.maxValue})
  @IsNumber({maxDecimalPlaces: 1}, {message: UpdateOfferValidationMessage.rating.invalidFormat})
  public rating: number;

  @IsOptional()
  @IsEnum(RentalType, {message: UpdateOfferValidationMessage.type.invalid})
  public type: RentalType;

  @IsOptional()
  @Min(1, {message: UpdateOfferValidationMessage.rooms.minValue})
  @Max(8, {message: UpdateOfferValidationMessage.rooms.maxValue})
  @IsNumber({}, {message: UpdateOfferValidationMessage.rooms.invalidFormat})
  public rooms: number;

  @IsOptional()
  @Min(1, {message: UpdateOfferValidationMessage.guests.minValue})
  @Max(10, {message: UpdateOfferValidationMessage.guests.maxValue})
  @IsNumber({}, {message: UpdateOfferValidationMessage.guests.invalidFormat})
  public guests: number;

  @IsOptional()
  @Min(100, {message: UpdateOfferValidationMessage.price.minValue})
  @Max(1000000, {message: UpdateOfferValidationMessage.price.maxValue})
  @IsNumber({}, {message: UpdateOfferValidationMessage.price.invalidFormat})
  public price: number;

  @IsOptional()
  @IsArray({message: UpdateOfferValidationMessage.amenities.invalidFormat})
  @IsEnum(RentalAmenities, {each: true, message: UpdateOfferValidationMessage.amenities.invalidAmenityFormat})
  public amenities: RentalAmenities[];

  @IsOptional()
  @IsArray({message: UpdateOfferValidationMessage.coordinates.invalidFormat})
  public coordinates: number[];
}
