const { User } = require('../models');

const userData = [
    {
        username: 'username',
        email: 'email',
        password: 'password'
    },
    {
        username: 'username',
        email: 'email',
        password: 'password'
    }
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;