const { BlogPost } = require('../models');

const blogpostData = [
    {
        title: 'First blog post',
        content: 'Stay Active',
        user_id: 1
    },
    {
        title: 'Second blog post',
        content: 'Stay Present',
        user_id: 2
    },
    {
        title: 'Third blog post',
        content: 'Stay Curious',
        user_id: 3
    }
];
const seedBlogPosts = () => BlogPost.bulkCreate(blogpostData);

module.exports = seedBlogPosts;