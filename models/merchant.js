const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const merchantSchema = new Schema({
  name: String,
});

const Merchant = mongoose.model("Merchant", merchantSchema);
module.exports = Merchant;
