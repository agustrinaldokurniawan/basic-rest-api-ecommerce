const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  alamat: [
    {
      type: mongoose.ObjectId,
      ref: "Address",
    },
  ],
  email: String,
  password: String,
  userID: String,
  appPin: String,
  device: {
    deviceType: String,
    deviceModel: String,
    deviceVersion: String,
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
