const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userOptions = {
  discriminatorKey: "itemtype",
  collection: "items",
};

const userSchema = new Schema(
  {
    name: String,
    email: String,
  },
  userOptions
);

const User = mongoose.model("User", userSchema);
module.exports = User;
