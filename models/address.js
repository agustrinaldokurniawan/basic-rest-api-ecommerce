const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const addressSchema = new Schema({
  nomor: Number,
  rt: Number,
  rw: Number,
  lengkap: String,
  kecamatan: String,
  kelurahan: String,
  kota: String,
  provinsi: String,
  negara: String,
  owner: {
    type: mongoose.ObjectId,
    ref: "User",
  },
});

const Address = mongoose.model("Address", addressSchema);
module.exports = Address;
