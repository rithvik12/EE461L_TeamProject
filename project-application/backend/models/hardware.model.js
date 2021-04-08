const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const hardwareSchema = new Schema({
    availability: { type: Number},
    capacity: {type: Number},
}, {
    timestamps: true,
});

const Hardware = mongoose.model('Hardware', hardwareSchema);

module.exports = Hardware;