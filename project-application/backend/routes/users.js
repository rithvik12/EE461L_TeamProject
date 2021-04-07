const router = require('express').Router();
let User = require('../models/user.model');

router.route('/').get((req, res) => {
// get a list of all users from database
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const username = req.body.username;
  // new stuff
  const password = req.body.password;

  //const newUser = new User({username});
  const newUser = new User({
    username, 
    password,
  });

  // new user saved to database
  newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;