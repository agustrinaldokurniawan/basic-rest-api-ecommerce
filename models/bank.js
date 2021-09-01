const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bankSchema = new Schema({
  owner: String,
  code: String,
  accountNumber: String,
  accountHolderName: String,
  type: String,
});

const Bank = mongoose.model("Bank", bankSchema);
module.exports = Bank;
