const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Post extends Model {
        static associate(models) {
            Post.belongsTo(models.User, {
                foreignKey: "Author",
                as: 'Author_data'
            })
        }
    }

    // test

    Post.init({
        Author: {
            type: DataTypes.INTEGER,
            field: 'Author'
        },
        Title: {
            type: DataTypes.STRING,
            field: 'Title'
        },
        Description: {
            type: DataTypes.STRING,
            field: 'Description'
        },
        Date: {
            type: DataTypes.DATE,
            field: 'Date'
        },
        isPublish: {
            type: DataTypes.BOOLEAN,
            field: 'isPublish',
            defaultValue: false,
        },
        isDelete: {
            type: DataTypes.BOOLEAN,
            field: 'isDelete',
            defaultValue: false,
        },
        createdAt: {
            type: DataTypes.DATE,
            field: 'createdAt'
        },
        updatedAt: {
            type: DataTypes.DATE,
            field: 'updatedAt'
        }
    }, {
        sequelize,
        tableName: 'post',
        modelName: 'Post',
        timestamps: true
    })
    return Post
}