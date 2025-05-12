import { IsMongoId, IsString, Length, Min, Max, IsNumber } from 'class-validator';
import { CreateCommentMessages } from './create-comment.messages.js';

export class CreateCommentDto {
  @IsString({message: CreateCommentMessages.text.invalidFormat})
  @Length(5, 1024, {message: CreateCommentMessages.text.lengthField})
  public text: string;

  @Min(1, {message: CreateCommentMessages.rating.minValue})
  @Max(5, {message: CreateCommentMessages.rating.maxValue})
  @IsNumber({}, {message: CreateCommentMessages.rating.invalidFormat})
  public rating: string;

  @IsMongoId({message: CreateCommentMessages.offerId.invalidFormat})
  public offerId: string;

  @IsMongoId({message: CreateCommentMessages.userId.invalidFormat})
  public userId: string;
}
