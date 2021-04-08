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
        
    })
})