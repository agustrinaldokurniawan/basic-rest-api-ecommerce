const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schemaWithDraw = new Schema({
  user: {
    type: mongoose.ObjectId,
    ref: "User",
  },
  xendit_resp: Object,
  status: {
    type: String,
    default: "REQUEST",
  },
});

const Withdraw = mongoose.model("Withdraw", schemaWithDraw);
module.export = Withdraw;
