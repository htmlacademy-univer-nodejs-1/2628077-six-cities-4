import { IsArray, IsDateString, IsInt, IsMongoId, Max, MaxLength, Min, MinLength } from 'class-validator';
import { CreateOfferMessages } from './createOfferMessages.ts';

export class CreateOfferDTO {
  @MinLength(10, { message: CreateOfferMessages.title.minLength })
  @MaxLength(100, { message: CreateOfferMessages.title.maxLength })
  public title: string;

  @MinLength(20, { message: CreateOfferMessages.description.minLength })
  @MaxLength(1024, { message: CreateOfferMessages.description.maxLength })
  public description: string;

  @IsDateString({}, { message: CreateOfferMessages.postDate.invalidFormat })
  public postDate: Date;

  @MaxLength(256, { message: CreateOfferMessages.image.maxLength })
  public image: string;

  @IsInt({ message: CreateOfferMessages.price.invalidFormat })
  @Min(100, { message: CreateOfferMessages.price.minValue })
  @Max(200000, { message: CreateOfferMessages.price.maxValue })
  public price: number;

  @IsArray({ message: CreateOfferMessages.categories.invalidFormat })
  @IsMongoId({ each: true, message: CreateOfferMessages.categories.invalidId })
  public categories: string[];

  @IsMongoId({ message: CreateOfferMessages.userId.invalidId })
  public userId: string;
}
