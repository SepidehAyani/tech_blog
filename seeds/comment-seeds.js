const { Comment } = require('../models');

const commentData = [
    {
        content: 'Comment 1',
        user_id: 1,
        blogpost_id: 2
    },
    {
        content: 'Comment 2',
        user_id: 2,
        blogpost_id: 1
    },
    {
        content: 'Comment 3',
        user_id: 3,
        blogpost_id: 1
    }
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;