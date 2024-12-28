const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true }, // Changed from `name` to `username`
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'user' }, // Optional field for user roles
});

module.exports = mongoose.model('User', userSchema);
