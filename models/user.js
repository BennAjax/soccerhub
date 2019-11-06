
  const mongoose = require('mongoose');

  // define the user schema
  const userSchema = mongoose.Schema({
      username: {type: String, unique: true},
      fullname: {type: String, unique: true, default: ''},
      email: {type: String, unique: true},
      password: {type: String, default: ''},
      userimage: {type: String, default: 'default.png'},
      facebook: {type: String, default: ''},
      fbTokens: Array,
      google: {type: String, default: ''},
      googleTokens: Array

  });
  // export userSchema as a model
  module.exports = mongoose.model('User', userSchema);