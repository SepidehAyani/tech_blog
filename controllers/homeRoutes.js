const router = require('express').Router();
const { User, BlogPost, Comment } = require('../models');

// Render blog post
router.get('/', async (req, res) => {
    try {
        const loggedIn = req.session.logged_in

        const blogPostData = await BlogPost.findAll({
            include: [{ model: User }]
        });
        const blogPost = blogPostData.map((post) => post.get({ plain: true }));
        res.render('home', { blogPost, loggedIn });
    } catch (err) {
        res.status(500).json(err);
    }
});


// Render blog post by id
router.get('/post/:id', async (req, res) => {
    try {
        const loggedIn = req.session.logged_in

        const blogPostData = await BlogPost.findByPk(req.params.id, {
            include: [
                { model: User },
                { model: Comment }
            ]
        });
        const blogPost = blogPostData.get({ plain: true });
        console.log(`\n ${blogPost.id} \n`)
        res.render('post', { bp: blogPost , loggedIn});

    } catch (err) {
        res.status(500).json(err);
    }
});

// Render login page
router.get('/login', async (req, res) => {
    try {
        res.render('login');
    } catch (err) {
        res.status(500).json(err);
    }
});

// Render registration page
router.get('/register', async (req, res) => {
    try {
        res.render('register');
    } catch (err) {
        res.status(500).json(err);
    }
});

// Render newPost page
router.get('/newPost', async (req, res) => {
    try {
        res.render('newPost');
    } catch (err) {
        res.status(500).json(err);
    }
});

// Render editPost page
router.get('/editPost/:id', async (req, res) => {
    try {

        const blogPostData = await BlogPost.findByPk(req.params.id, {
            include: [
                { model: User },
            ]
        });
        const blogPost = blogPostData.get({ plain: true });
        console.log(`\n ${blogPost.id} \n`)
        res.render('editPost', { bp: blogPost });

    } catch (err) {
        res.status(500).json(err);
    }

});

// Get all the users
router.get('/user', async (req, res) => {
    try {
        console.log(`\n Getting all user data \n`);
        const userData = await User.findAll();
        res.status(200).json(userData);

    } catch (err) {
        res.status(500).json(err);
    }
});

// Get all user by id
router.get('/user/all/:id', async (req, res) => {
    try {
        console.log(`\n Getting data for user with id: ${req.params.id} \n`)

        const userData = await User.findByPk(req.params.id, {
            include: [
                { model: BlogPost },
                { model: Comment }
            ]
        });
        if (!userData) {
            res.status(404).json({ message: 'No users found with this id' });
        } else {
            res.status(200).json(userData);
        }

    } catch (err) {
        res.status(500).json(err);
    }
});

// Get all blogpost
router.get('/blogpost', async (req, res) => {
    try {
        console.log(`\n Getting all blog post data \n`);

        const blogPostData = await BlogPost.findAll();
        res.status(200).json(blogPostData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get all blogpost by id
router.get('/blogpost/all/:id', async (req, res) => {
    try {
        console.log(`\n Getting data for blog post with id: ${req.params.id} \n`);

        const blogPost = await BlogPost.findByPk(req.params.id, {
            include: [
                { model: User },
                { model: Comment }
            ]
        });
        if (!blogPost) {
            res.status(404).json({ message: 'No blog post found with this id.' });
        } else {
            res.status(200).json(blogPost);
        }

    } catch (err) {
        res.status(500).json(err);
    }
})

// Get all comments
router.get('/comment', async (req, res) => {
    try {
        console.log(`\n Getting all comment data \n`);

        const commentData = await Comment.findAll();
        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get all comments by id
router.get('/comment/all/:id', async (req, res) => {
    try {
        console.log(`\n Getting comments with id: ${req.params.id} \n`)
        const commentData = await Comment.findByPk(req.params.id, {
            include: [
                { model: User },
                { model: BlogPost }
            ]
        });
        if (!commentData) {
            res.status(404).json({ message: 'No comments found with this id.' });
        } else {
            res.status(200).json(commentData);
        }

    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;