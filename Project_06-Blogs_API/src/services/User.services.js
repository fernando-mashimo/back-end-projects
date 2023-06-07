const { User } = require('../models');

const getAllUsers = async () => {
  const allUsers = await User.findAll({
    attributes: { exclude: ['password'] },
  });
   return allUsers;
};

const getUserByEmail = async (email) => User
  .findOne({ where: { email } });

const getUserById = async (id) => {
  const result = await User.findOne({
    where: { id },
    attributes: { exclude: ['password'] },
  });
  return result;
};

const createUser = async (userData) => User.create(userData);

const deleteUser = async (id) => {
  const result = User.destroy({
    where: { id },
  });
  return result;
};

module.exports = {
  getAllUsers,
  getUserByEmail,
  getUserById,
  createUser,
  deleteUser,
};
