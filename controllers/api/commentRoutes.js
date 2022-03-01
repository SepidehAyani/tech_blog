const router = require('express').Router();
const { Comment } = require('../../models');

// Create a new comment
router.post('/', async (req, res) => {
    try {
        console.log(`\n Making new comment with id: ${req.body.id} \n`);

        const commentData = await Comment.create(req.body);

        res.status(200).json(commentData);
    } catch (err) {
        res.status(400).json(err);
    }
});

// Update a comment by its ID
router.put('/:id', async (req, res) => {
    try {

        const commentData = await Comment.update(
            {
                content: req.body.content,
                user_id: req.body.user_id,
                blogpost_id: req.body.blogpost_id
            },
            { where: { id: req.params.id } }
        )

        if (!commentData) {
            res.status(404).json({ message: 'no comment found with this id' });
        } else {
            console.log(`\n Editing comment record id: ${req.params.id} \n`)
            res.status(200).json(commentData);
        }
    } catch (err) {
        res.status(400).json(err)
    }
});

// Delete a comment by its ID
router.delete('/:id', async (req, res) => {
    try {
        const commentData = await Comment.destroy({
            where: { id: req.params.id }
        });

        if (!commentData) {
            res.status(404).json({ message: 'no comment found with this id' });
        } else {
            console.log(`\n Deleting comment with id: ${req.params.id} \n`);
            res.status(200).json(commentData);
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;