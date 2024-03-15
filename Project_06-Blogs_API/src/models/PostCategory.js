const PostCategoryModel = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define(
    'PostCategory',
    {
      postId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: 'blogPosts',
          key: 'id',
        },
      },
      categoryId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: 'categories',
          key: 'id',
        },
      },
    },
    {
      timestamps: false,
      underscored: true,
      tableName: 'posts_categories',
    }
  );
  PostCategory.associate = (models) => {
    models.Category.belongsToMany(models.BlogPost, {
      as: 'blogPosts',
      through: 'PostCategory',
      foreignKey: 'postId',
      otherKey: 'categoryId',
    });
    models.BlogPost.belongsToMany(models.Category, {
      as: 'categories',
      through: 'PostCategory',
      foreignKey: 'categoryId',
      otherKey: 'postId',
    });
  };
  return PostCategory;
};

module.exports = PostCategoryModel;
