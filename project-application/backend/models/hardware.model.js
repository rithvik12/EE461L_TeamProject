const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const hardwareSchema = new Schema({
    projectName: {type: String},
    availability: { type: Number},
    capacity: { type: Number},
    checkedIn: { type: Number},
    checkedOut: { type: Number},
}, {
    timestamps: true,
});

const Hardware = mongoose.model('Hardware', hardwareSchema);

module.exports = Hardware;