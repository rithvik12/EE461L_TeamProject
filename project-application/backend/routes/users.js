const router = require('express').Router();
let User = require('../models/user.model');

//first endpoint handles incoming HTTP GET requests on the /users/ URL path
router.route('/').get((req, res) => {
//get a list of all users from database
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

//second endpoint handles incoming HTTP POST requests on the /users/add/ URL path
router.route('/add').post((req, res) => {
  //new username is part of the request body
  const username = req.body.username;
  // new stuff
  const password = req.body.password;
  
  //create a new instance of User
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