import { Login } from '../../src/types/Login';
import { Token } from '../../src/types/Token';
import { User } from '../../src/types/User';

const validUser: User = {
  id: 1,
  username: 'Hagar',
  vocation: 'Guerreiro',
  level: 10,
  password: '$2a$10$p9xOtI39KahyYLwHdyHaleMmXswBrs9jRWovb6IyeVzef1nyddzGG',
};

const validUserInput: Login = {
  username: 'Hagar',
  password: 'terrível',
};

const invalidUsername: Login = {
  username: 'William',
  password: 'terrível',
};

const invalidUserPassword: Login = {
  username: 'Hagar',
  password: 'fraco123',
};

const userInputNoName: Login = {
  username: '',
  password: 'fraco123',
};

const userInputNoPwd: Login = {
  username: 'Wiliam',
  password: '',
};

const errorMissingLoginData: object = {
  message: '"username" and "password" are required',
}

const errorInvalidNameOrPwd: object = {
  message: 'Username or password invalid',
};

const token: string = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
    .eyJpZCI6MSwidXNlcm5hbWUiOiJIYWdhciIsImlhdCI6MTY4NTIwNDk1NH0
    .n6JfyoBryDwRDzVgvb0VtyAvm8yp44BHoOWlUEFxM8A`;

export default {
  validUser,
  validUserInput,
  token,
  invalidUsername,
  invalidUserPassword,
  userInputNoName,
  userInputNoPwd,
  errorMissingLoginData,
  errorInvalidNameOrPwd,
};
