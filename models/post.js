const { Model, Datatypes } = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model {}

Post.init(
    {
        title: {
            type: Datatypes.STRING
        },
        body: {
            type: Datatypes.STRING
        } 
    },
    {
        sequelize,
        timestamps: true,
        freezeTableName: true,
        underscored: true,
        modelName: 'post',
    }
)