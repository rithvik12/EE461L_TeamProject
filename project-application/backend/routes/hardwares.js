const router = require('express').Router();
let Hardware = require('../models/hardware.model');

//first endpoint handles incoming HTTP GET requests on the /hardwares/ URL path
router.route('/').get((reg, res) => {
    Hardware.find()
    .then(hardwares => res.json(hardwares))
    .catch(err => res.status(400).json('Error: ' + err));
});

//second endpoint handles incoming HTTP POST requests on the /hardwares/add/ URL path
router.route('/add').post((req, res) => {
    const username = req.body.username;
    const description = req.body.description;
    const hw1available = 100;
    const hw1checkedOut = 0;
    const hw2available = 100;
    const hw2checkedOut = 0;

    const newHardware = new Hardware({
        username,
        description,
        hw1available,
        hw1checkedOut,
        hw2available,
        hw2checkedOut,
    });

    newHardware.save()
    .then(() => res.json('Hardware added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

///:id GET endpoint returns a hardware item given an id
router.route('/:id').get((req, res) => {
    Hardware.findById(req.params.id)
      .then(hardware => res.json(hardware))
      .catch(err => res.status(400).json('Error: ' + err));
  });

///:id DELETE endpoint deletes a hardware item given an id
router.route('/:id').delete((req, res) => {
    Hardware.findByIdAndDelete(req.params.id)
      .then(() => res.json('Hardware deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
  });

///update/:id POST endpoint updates an existing hardware item
router.route('/update/:id').post((req, res) => {
    Hardware.findById(req.params.id)
    .then(hardware => {
        hardware.username = req.body.username;
        hardware.description = req.body.description;
        hardware.hw1available = req.body.hw1available;
        hardware.hw1checkedOut = req.body.hw1checkedOut;
        hardware.hw2available = req.body.hw2available;
        hardware.hw2checkedOut = req.body.hw2checkedOut;

        hardware.save()
        .then(() => res.json('Hardware updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;