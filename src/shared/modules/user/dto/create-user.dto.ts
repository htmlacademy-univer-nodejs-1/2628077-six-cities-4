import {UserType} from '../../../types/index.js';
import {IsEmail, IsEnum, IsString, Length} from 'class-validator';
import {CreateUserMessage} from './create-user.messages.js';


export class CreateUserDto {
  @IsString({message: CreateUserMessage.name.invalidFormat})
  @Length(1, 15, {message: CreateUserMessage.name.lengthField})
  public name: string;

  @IsEmail({}, {message: CreateUserMessage.email.invalidFormat})
  public email: string;

  @IsString({message: CreateUserMessage.avatar.invalidFormat})
  public avatar: string;

  @IsEnum(UserType, {message: CreateUserMessage.type.invalidFormat})
  public password: string;

  @IsString({message: CreateUserMessage.password.invalidFormat})
  @Length(6, 12, {message: CreateUserMessage.password.lengthField})
  public type: UserType;
}
