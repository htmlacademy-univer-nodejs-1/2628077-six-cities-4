
export type TypeUser = 'default' | 'pro';

interface IUser {
  name: string;
  email: string;
  avatar: string;
  password: string;
  typeUser: TypeUser;
}

export default IUser;
