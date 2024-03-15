const validUserInput = {
  email: 'teste@teste.com',
  password: '1234567',
}

const userWithOutEmail = {
  email: '',
  password: '1234567',
}

const userWithOutPwd = {
  email: 'teste@teste.com',
  password: '',
};

const userWithInvalidEmail = {
  email: 'teste@',
  password: '1234567',
};

const userWithInvalidPwd = {
  email: 'teste@teste.com',
  password: '12345',
};

const validUser = {
  id: 1,
  username: 'TesteName',
  role: 'TesteRole',
  email: 'teste@teste.com',
  password: '1234567',
};

export default {
  validUserInput,
  userWithOutEmail,
  userWithOutPwd,
  userWithInvalidEmail,
  userWithInvalidPwd,
  validUser,
}
