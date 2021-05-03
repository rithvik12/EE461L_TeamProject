//database schema for user model

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//user model fields and validation
const userSchema = new Schema({
  username: { type: String, required: true, unique: true, trim: true, minlength: 3},
  //new stuff
  password: { type: String, required: true, unique: true, trim: true, minLength: 3},
}, {
  timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;