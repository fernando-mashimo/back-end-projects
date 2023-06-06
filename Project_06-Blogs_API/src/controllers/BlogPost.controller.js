const { blogPostServices } = require('../services');
const retrieveUserId = require('../utils/retrieveUserId');

const createPost = async (req, res) => {
  try {
    const postData = req.body;
    const { authorization } = req.headers;
    const userId = retrieveUserId(authorization);
    const newPost = await blogPostServices.createPost(postData, userId);
    return res.status(201).json(newPost);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

const getAllPosts = async (_req, res) => {
  try {
    const allPosts = await blogPostServices.getAllPosts();
    return res.status(200).json(allPosts);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

const getPostById = (req, res) => {
  try {
    const post = req.postStorage;
    return res.status(200).json(post);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const newPostData = req.body;
    await blogPostServices.updatePost(id, newPostData);
    const newPost = await blogPostServices.getPostById(+id);
    return res.status(200).json(newPost);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    await blogPostServices.deletePost(+id);
    return res.status(204).end();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

const searchPostByTerm = async (req, res) => {
  try {
    const { q } = req.query;
    const foundPosts = await blogPostServices.searchPostByTerm(q);
    return res.status(200).json(foundPosts);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
  searchPostByTerm,
};
