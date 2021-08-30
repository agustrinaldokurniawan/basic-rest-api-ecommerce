const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const koziiSchema = new Schema({
  name: String,
});

const Kozii = mongoose.model("Kozii", koziiSchema);
module.exports = Kozii;
