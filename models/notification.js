const mongoose = require("mongoose");

const AUDIENCE_TYPE = [
  "MERCHANT_ONLY",
  "VISITOR_ONLY",
  "MERCHANT_MITRA",
  "MITRA_VISITOR",
  "ALL_TYPES",
];
const CATEGORY = [
  "NEWS",
  "PROMO",
  "MERCHANT_MITRA",
  "DISCOUNT",
  "SPECIAL",
  "NEW_PRODUCT",
  "HOT",
];
const OWNER_TYPE = ["KOZII", "MITRA", "MERCHANT"];

const notificationSchema = new mongoose.Schema({
  audience: {
    type: String,
    enum: AUDIENCE_TYPE,
    default: "VISITOR_ONLY",
  },
  title: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  ImageUrl: {
    type: String,
    default: "",
  },
  category: {
    type: String,
    enum: CATEGORY,
    default: "SPECIAL",
  },
  ownerTypes: {
    type: String,
    enum: OWNER_TYPE,
    default: "KOZII",
  },
  ownerId: {
    type: String,
    required: true,
  },
});

notificationSchema.pre("save", async function (next) {
  next();
});

const Notification = mongoose.model("Notification", notificationSchema);
module.exports = Notification;
