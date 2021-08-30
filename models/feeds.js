const mongoose = require("mongoose");

const AUDIENCE_TYPE = [
  "MERCHANT_ONLY",
  "VISITOR_ONLY",
  "MERCHANT_MITRA",
  "MITRA_VISITOR",
  "ALL_TYPES",
];
const TAGS_TYPE = [
  "NEWS",
  "PROMO",
  "MERCHANT_MITRA",
  "DISCOUNT",
  "SPECIAL",
  "NEW_PRODUCT",
  "HOT",
];
const OWNER_TYPE = ["KOZII", "MITRA", "MERCHANT"]; //yang di post mitra id, bukan user id

const feedSchema = new mongoose.Schema({
  audience: {
    type: String,
    enum: AUDIENCE_TYPE,
    default: "VISITOR_ONLY",
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  ImageUrl: {
    type: String,
    default: "",
  },
  tags: {
    type: String,
    enum: TAGS_TYPE,
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

feedSchema.pre("save", async function (next) {
  next();
});

const Feed = mongoose.model("Feed", feedSchema);
module.exports = Feed;
