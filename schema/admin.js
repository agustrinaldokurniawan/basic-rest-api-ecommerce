const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Admin = mongoose.model(
  "Admin",
  new Schema({
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
    },
    level: {
      type: String,
      enum: [
        "koziiadmin",
        "supervisor",
        "useradmin",
        "merchantadmin",
        "management",
        "adminmarkom",
        "supermarkom",
        "managermarkom",
        "canvasser",
      ],
      default: "useradmin",
    },
    invitedMerchant: [{ type: "ObjectId", ref: "MerchantRequest" }],
    chat: [{ type: "ObjectId", ref: "Chat" }],
  }),
  "Admin"
);

module.exports = Admin;
