import { IUser } from '../Interfaces/IUser';
import SequelizeUser from '../database/models/SequelizeUser';
import { IUserModel } from '../Interfaces/models/IUserModel';

export default class UserModel implements IUserModel {
  private model = SequelizeUser;

  findUserByEmail = async (email: string): Promise<IUser | null> => {
    const dbUser = await this.model.findOne({
      where: {
        email,
      },
    });

    if (!dbUser) return null;

    return {
      id: dbUser.id,
      username: dbUser.username,
      role: dbUser.role,
      email: dbUser.email,
      password: dbUser.password,
    };
  };
}
