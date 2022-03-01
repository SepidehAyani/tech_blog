const router = require('express').Router();
const { User, BlogPost } = require('../../models');

// Create new blog post
router.post('/newPost', async (req, res) => {

    const postData = await User.findOne({ where: { username: req.body.username } });

    if (!postData) {
        res
            .status(400)
            .json({ message: 'Incorrect username, please enter valid username' });
        return;
    }

    const bpData = {
        title: req.body.title,
        content: req.body.content,
        user_id: postData.id,
    }

    res.render('home');

    const newPost = await BlogPost.create(bpData);
});

// Delete a blog post by its ID
router.delete('/:id', async (req, res) => {
    try {
        const bpData = await BlogPost.destroy({
            where: { id: req.params.id }
        });

        // if wrong id entered
        if (!bpData) {
            res.status(404).json({ message: 'no blog post found with this id' });
        } else {
            console.log(`\n Deleting blog post with id: ${req.params.id} \n`);
            res.status(200).json(bpData);
        }

    } catch (err) {
        res.status(500).json(err);
    }
})

// Update blog post by its ID
router.put('/:id', async (req, res) => {
    try {

        const bpData = await BlogPost.update(
            {
                title: req.body.title,
                content: req.body.content,
                user_id: req.body.user_id
            },
            { where: { id: req.params.id } }
        )
        if (!bpData) {
            res.status(404).json({ message: 'no blog post found with this id' });
        } else {
            console.log(`\n Editing blog post record id: ${req.params.id} \n`)
            res.status(200).json(bpData);
        }


    } catch (err) {
        res.status(400).json(err)
    }
});

module.exports = router;