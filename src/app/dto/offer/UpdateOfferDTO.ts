import {
  IsDateString,
  IsInt,
  IsMongoId,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import {UpdateOfferMessage} from './updateOfferMessages.ts';

export class UpdateOfferDTO {
  @IsOptional()
  @MinLength(10,{ message: UpdateOfferMessage.title.minLength })
  @MaxLength(100, { message: UpdateOfferMessage.title.maxLength })
  public title?: string;

  @IsOptional()
  @MinLength(20, { message: UpdateOfferMessage.description.minLength })
  @MaxLength(1024, { message: UpdateOfferMessage.description.maxLength })
  public description?: string;

  @IsOptional()
  @IsDateString({}, { message: UpdateOfferMessage.postDate.invalidFormat })
  public postDate?: Date;

  @IsOptional()
  @IsString({ message: UpdateOfferMessage.image.invalidFormat })
  @MaxLength(256, { message: UpdateOfferMessage.image.maxLength })
  public image?: string;

  @IsOptional()
  @IsInt({ message: UpdateOfferMessage.price.invalidFormat })
  @Min(100, { message: UpdateOfferMessage.price.min })
  @Max(20000, { message: UpdateOfferMessage.price.max })
  public price?: number;

  @IsOptional()
  @IsMongoId({ each: true, message: UpdateOfferMessage.categories.invalidFormat })
  public categories?: string[];
}
