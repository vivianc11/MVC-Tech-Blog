// Importing user, post, and comment
const user = require('./user');
const post = require('./post');
const comment = require('./comment');

// Associations between the different models
user.hasMany(post, {
    foreignKey: 'user_id'
})

post.belongsTo(user, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

post.hasMany(comment, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE'
});

comment.belongsTo(user, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
})

comment.belongsTo(post, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE'
})

user.hasMany(comment, {
    foreignKey:'user_id',
    onDelete: 'CASCADE'
})

module.exports = {
    user,
    comment,
    post
};