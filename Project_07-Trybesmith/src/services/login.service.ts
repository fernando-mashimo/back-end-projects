import bcrypt from 'bcryptjs';
import { ServiceResponse } from '../types/ServiceReponse';
import { Login } from '../types/Login';
import { Token } from '../types/Token';
import UserModel from '../database/models/user.model';
import authUtil from '../utils/auth.util';

const verifyLogin = async (login: Login): Promise<ServiceResponse<Token>> => {
  const userExists = await UserModel.findOne({ where: { username: login.username } });
  if (!userExists || !bcrypt.compareSync(login.password, userExists.dataValues.password)) {
    return {
      status: 'UNAUTHORIZED',
      data: { message: 'Username or password invalid' },
    };
  }
  const payload = {
    id: userExists.dataValues.id,
    username: userExists.dataValues.username,
  };
  const token = authUtil.sign(payload);
  return {
    status: 'SUCCESSFUL',
    data: { token },
  };
};

export default {
  verifyLogin,
};