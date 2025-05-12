import { IsEmail, IsString } from 'class-validator';
import { LoginUserMessage } from './loginUserMessages.ts';

export class LoginUserDTO {
  @IsEmail({}, { message: LoginUserMessage.email.invalidFormat })
  public email: string;

  @IsString({ message: LoginUserMessage.password.invalidFormat })
  public password: string;
}
