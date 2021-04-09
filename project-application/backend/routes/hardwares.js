const router = require('express').Router();
let Hardware = require('../models/hardware.model');

router.route('/').get((reg, res) => {
    Hardware.find()
    .then(hardwares => res.json(hardwares))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    Hardware.findById(req.params.id)
    .then(hardware => {
        hardware.username = req.body.username;
        hardware.description = req.body.description;
        hardware.hw1available = req.body.hw1available;
        hardware.hw2available = req.body.hw2available;
        hardware.hw1checkedOut = req.body.hw1checkedOut;
        hardware.hw2checkedOut = req.body.hw2checkedOut;

        hardware.save()
        .then(() => res.json('Hardware updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;