const router = require('express').Router();
const { User } = require('../../models');

// Create a user login credentials
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { username: req.body.username } });
    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect username. Please try again.' });
      return;
    }
    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect password. Please try again.' });
      return;
    }
    res.render('home');

  } catch (err) {
    res.status(400).json(err);
  }
});

// Create a new user
router.post('/registerUser', async (req, res) => {
  try {
    const userData = await User.create(req.body);
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
    res.render('home');
  } catch (err) {
    res.status(400).json(err);
  }
});

// Logout
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
      req.session.destroy(() => {
          res.status(204).end();
      });
  } else {
      res.status(404).end();
  }
});

// Create a new blog post
router.post('/newPost/makePost', async (req, res) => {
  const userData = await User.findOne({ where: { username: req.body.username } });
  if (!userData) {
    res
      .status(400)
      .json({ message: 'Incorrect username. Please enter valid username.' });
    return;
  }

  const newPost = await User.create(req.body);
  res.render('home');
})

// Get by username
router.get('/:username', async (req, res) => {
  try {
    console.log(`\n Getting data for user with username: ${req.params.username} \n`)

    const userData = await User.findOne({ where: { username: req.params.username } });

    if (!userData) {
      res.status(404).json({ message: 'No users found with this username' });
    } else {
      res.status(200).json(userData);
    }

  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;