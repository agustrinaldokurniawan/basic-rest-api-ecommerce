const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = require("./user");

const sellerSchema = new Schema({
  levelSeller: {
    type: Number,
    default: 0,
  },
});

const Seller = User.discriminator("Seller", sellerSchema);
module.exports = Seller;
