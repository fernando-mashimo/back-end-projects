const { Op } = require('sequelize');
const { sequelize, BlogPost, PostCategory, User, Category } = require('../models');

const createPost = async (postData, userId) => {
  const newPost = await sequelize.transaction(async (t) => {
    const { title, content, categoryIds } = postData;
    const published = new Date();
    const newBlogPost = await BlogPost
      .create({ title, content, userId, updated: published, published }, { transaction: t });

    await Promise.all(categoryIds.map(async (categoryId) =>
       PostCategory.create({ postId: newBlogPost.id, categoryId }, { transaction: t })));

    return newBlogPost.dataValues;
  });
  return newPost;
};

const getAllPosts = async () => BlogPost.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      {
        model: Category,
        as: 'categories',
        attributes: { exclude: ['PostCategory'] },
        through: { attributes: [] },
      },
    ],
});

const getPostById = async (id) => BlogPost.findOne({
    where: { id },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      {
        model: Category,
        as: 'categories',
        attributes: { exclude: ['PostCategory'] },
        through: { attributes: [] },
      },
    ],
});

const updatePost = async (id, newData) => {
  const newPost = await BlogPost.update(newData, {
    where: { id },
  });
  return newPost;
};

const deletePost = async (id) => {
  const result = await BlogPost.destroy({
    where: { id },
  });
  return result;
};

const searchPostByTerm = async (term) => {
  const foundPosts = await BlogPost.findAll({
    where: {
      [Op.or]: [
        { title: { [Op.like]: `%${term}%` } },
        { content: { [Op.like]: `%${term}%` } },
      ],
    },
    include: [{ model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, 
        as: 'categories',
        attributes: { exclude: ['PostCategory'] },
        through: { attributes: [] },
      },
    ],
  });
  return foundPosts;
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
  searchPostByTerm,
};