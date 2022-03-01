const User = require('./User');
const BlogPost = require('./BlogPost');
const Comment = require('./Comment');

// User has one:many relationship to BlogPost
User.hasMany(BlogPost, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});
// BlogPost has many:one relationship to User
BlogPost.belongsTo(User, {
    foreignKey: 'user_id'
});
// User has one:many relationship to Comment
User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});
// Comment has many:one relationship to user
Comment.belongsTo(User, {
    foreignKey: 'user_id',
});
// Blog post has many:one relationship to comment
BlogPost.hasMany(Comment, {
    foreignKey: 'blogpost_id',
    onDelete: 'CASCADE',
})
// Comment has many:one relationship to blogpost
Comment.belongsTo(BlogPost, {
    foreignKey: 'blogpost_id',
});

module.exports = { User, BlogPost, Comment };