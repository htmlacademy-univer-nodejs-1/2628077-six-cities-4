import IUser from '../../models/IUser.ts';
import {UserEntity} from '../../DB/mongo/entities/UserEntity.ts';
import {DocumentType} from '@typegoose/typegoose';

interface IUserService {
  create(user: IUser): Promise<DocumentType<UserEntity>>;
  findByEmail(email: string): Promise<DocumentType<UserEntity> | null>;
  findByID(id: string): Promise<DocumentType<UserEntity> | null>;
}

export default IUserService;
