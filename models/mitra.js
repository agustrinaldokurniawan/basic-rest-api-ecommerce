const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mitraSchema = new Schema({
  name: String,
});

const Mitra = mongoose.model("Mitra", mitraSchema);
module.exports = Mitra;
