import { User, UserType } from '../../types/index.js';
import { defaultClasses, getModelForClass, modelOptions, prop } from '@typegoose/typegoose';
import { createSHA256 } from '../../helpers/index.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface UserEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'users'
  }
})
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class UserEntity extends defaultClasses.TimeStamps implements User {
  @prop({
    required: true,
    default: '',
    type: () => String
  })
  public name: string;

  @prop({
    unique: true,
    required: true,
    type: () => String
  })
  public email: string;

  @prop({
    required: false,
    default: '',
    type: () => String
  })
  public avatar: string;

  @prop({
    required: true,
    type: () => String,
    enum: UserType
  })
  public type: UserType;

  @prop({
    required: true,
    default: '',
    type: () => String
  })
  private password?: string;

  constructor(userData: User) {
    super();

    this.name = userData.name;
    this.email = userData.email;
    this.avatar = userData.avatar;
    this.type = userData.type;
  }

  public setPassword(password: string, salt: string) {
    this.password = createSHA256(password, salt);
  }

  public getPassword() {
    return this.password;
  }
}

export const UserModel = getModelForClass(UserEntity);
