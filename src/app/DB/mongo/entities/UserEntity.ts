import {defaultClasses, getModelForClass, modelOptions, prop, Ref} from '@typegoose/typegoose';
import IUser, {TypeUser} from '../../../models/IUser.ts';
import {hash} from 'bcrypt-ts';
import {env} from '../../../settings/globalVariables.ts';
import {OfferEntity} from './OfferEntity.ts';

export interface UserEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'users',
    timestamps: true
  }
})

export class UserEntity extends defaultClasses.TimeStamps {
  @prop({unique: true, required: true, type: () => String})
  public email = '';

  @prop({required: true, default: '', type: () => String})
  public name = '';

  @prop({required: true, default: '', type: () => String})
  public password = '';

  @prop({required: true, default: '', type: () => String})
  public avatar = '';

  @prop({required: true, default: 'default', type: () => String})
  public typeUser: TypeUser = 'default';

  @prop({ ref: () => OfferEntity, required: true})
  public comments: Ref<OfferEntity>[] = [];

  constructor(userData: IUser) {
    super();
    const {email, avatar, name, typeUser, password } = userData;
    this.email = email;
    this.avatar = avatar;
    this.name = name;
    this.typeUser = typeUser;
    this.password = password;
    (async () => {
      this.password = await this.setPassword(userData.password);
    })();
  }

  private async setPassword(password: string): Promise<string> {
    return hash(password, env.SALT);
  }
}

export const UserModel = getModelForClass(UserEntity);
