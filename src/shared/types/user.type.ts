import { UserType } from './user-type.enum.js';

export type User = {
  name: string;
  mail: string;
  avatar: string | null;
  password: string;
  type: UserType;
}
