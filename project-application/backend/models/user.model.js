//database schema for user model

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//user model fields and validation
const UserSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

//const User = mongoose.model('User', userSchema);

//export model to access outside file
module.exports = User = mongoose.model("users", UserSchema);