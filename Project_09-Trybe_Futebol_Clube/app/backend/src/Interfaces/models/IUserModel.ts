import { IUser } from '../IUser';

export interface IUserModel {
  findUserByEmail(email: IUser['email']): Promise<IUser | null>;
}
