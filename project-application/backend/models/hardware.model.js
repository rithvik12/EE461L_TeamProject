//database schema for hardware model

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//hardware schema fields and validations
const hardwareSchema = new Schema({
    username: {type: String},
    description: {type: String},
    hw1available: { type: Number},
    hw2available: {type: Number},
    // capacity: { type: Number},
    hw1checkedOut: { type: Number},
    hw2checkedOut: { type: Number},
}, {
    timestamps: true,
});

const Hardware = mongoose.model('Hardware', hardwareSchema);

module.exports = Hardware;