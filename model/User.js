const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: String,
  },
  phone: {
    type: Number,
  },
  userType: {
    type: String,
  },
  socialType: {
    type: String,
  },
});

module.exports = mongoose.model("User", userSchema);
