import * as bcryptjs from 'bcryptjs';
import { Token } from '../Types/Token';
import { ServiceResponse } from '../Interfaces/services/ServiceResponse';
import { Login } from '../Types/Login';
import ITokenGenerator from '../Interfaces/ITokenGenerator';
import { IUserModel } from '../Interfaces/models/IUserModel';

export default class UserService {
  constructor(
    private userModel: IUserModel,
    private tokenGenerator: ITokenGenerator,
    private invalidEmailOrPasswordMsg: string = 'Invalid email or password',
  ) {}

  public login = async (login: Login): Promise<ServiceResponse<Token>> => {
    const { email, password } = login;

    const foundUser = await this.userModel.findUserByEmail(email);

    if (!foundUser) {
      return {
        status: 'UNAUTHORIZED',
        data: { message: this.invalidEmailOrPasswordMsg },
      };
    }

    const isPasswordValid = bcryptjs.compareSync(password, foundUser.password);
    if (!isPasswordValid) {
      return {
        status: 'UNAUTHORIZED',
        data: { message: this.invalidEmailOrPasswordMsg },
      };
    }

    const token = this.tokenGenerator.generate(login.email);
    return { status: 'SUCCESSFUL', data: { token } };
  };

  public getRole = async (token: string):Promise<ServiceResponse<{ role: string }>> => {
    const userEmail = this.tokenGenerator.decode(token);
    const foundUser = await this.userModel.findUserByEmail(userEmail);
    if (!foundUser) {
      return {
        status: 'UNAUTHORIZED',
        data: { message: this.invalidEmailOrPasswordMsg },
      };
    }
    return { status: 'SUCCESSFUL', data: { role: foundUser.role } };
  };
}
