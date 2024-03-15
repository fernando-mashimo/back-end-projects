const { createToken } = require('../authentication/authFunctions');
const { userServices } = require('../services');
const retrieveUserId = require('../utils/retrieveUserId');

const userLogin = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await userServices.getUserByEmail(email);
    if (!user) return res.status(400).json({ message: 'Invalid fields' });

    const { password: _password, ...userSafeData } = user;
    const token = createToken(userSafeData);

    return res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

const createUser = async (req, res) => {
  try {
    const userData = req.body;
    const newUser = await userServices.createUser(userData);

    const { password: _password, ...userSafeData } = newUser;
    const token = createToken(userSafeData);
    return res.status(201).json({ token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

const getAllUsers = async (_req, res) => {
  try {
    const allUsers = await userServices.getAllUsers();
    return res.status(200).json(allUsers);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params; 
    const user = await userServices.getUserById(+id);
    if (!user) return res.status(404).json({ message: 'User does not exist' });
    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { authorization } = req.headers;
    const userId = retrieveUserId(authorization);
    await userServices.deleteUser(+userId);
    return res.status(204).end();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  userLogin,
  createUser,
  getAllUsers,
  getUserById,
  deleteUser,
};
