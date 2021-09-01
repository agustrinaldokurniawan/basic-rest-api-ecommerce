const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schemaResetPassword = new Schema({
  user: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["REQUEST", "APPROVE", "REJECT"],
    default: "REQUEST",
  },
  type: {
    type: String,
    enum: ["KOZII", "MERCHANT", "MITRA", ""],
    default: "",
  },
});

const ResetPassword = mongoose.model("ResetPassword", schemaResetPassword);
module.exports = ResetPassword;
