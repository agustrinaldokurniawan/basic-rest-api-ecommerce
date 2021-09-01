const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mitraSchema = new Schema({
  userID: {
    type: "ObjectId",
    ref: "User",
  },
  linkedReferralCode: {
    type: "String",
    default: "",
  },
  mitraCoreInfo: {
    NIK: {
      type: String,
      default: "",
    },
    ktpImageUrl: {
      type: String,
      default: "",
    },
    dateOfBirth: {
      type: String,
    },
    community: {
      type: String,
      default: "",
    },
    totalComission: {
      type: String,
    },
    currentComissionBalance: {
      type: String,
    },
    instagram: {
      type: String,
    },
    facebook: {
      type: String,
    },
    joinDate: {
      type: Date,
      default: Date.now,
    },
  },
  mitraProfession: {
    NIP: {
      type: String,
      default: "",
    },
    professionName: {
      type: String,
      default: "",
    },
    isTeacher: {
      type: Boolean,
      default: false,
    },
  },
  mitraStatus: {
    accountType: {
      type: String,
      enum: ["PEMASARAN", "KOMUNITAS"],
      default: "KOMUNITAS",
    },
    referralCode: {
      type: String,
    },
    mitraLevel: {
      type: String,
      enum: [
        "JR_SQUAD",
        "SR_SQUAD",
        "JR_LEADER",
        "SR_LEADER",
        "JR_SUPER",
        "SR_SUPER",
        "TOP_SUPER",
        "BRONZE",
        "SILVER",
        "GOLD",
        "PLATINUM",
        "TITANIUM",
      ],
      default: "BRONZE",
    },
  },
  activeInfo: {
    lastLogin: {
      type: Date,
      default: Date.now,
    },
    isOnline: {
      type: Boolean,
      default: false,
    },
  },
  xenditVirtualAccountNumber: {
    type: String,
    default: "",
  },
  comissionHistory: [
    {
      type: "ObjectId",
      ref: "HistorySchema",
    },
  ],
  mitraBankInfo: [
    {
      type: "ObjectId",
      ref: "Bank",
    },
  ],
  visitorHandled: [
    {
      type: "ObjectId",
      ref: "User",
    },
  ],
  mitraInvited: [
    {
      type: "ObjectId",
      ref: "Mitra",
    },
  ],
  feeds: [
    {
      type: "ObjectId",
      ref: "Feeds",
    },
  ],
});

const Mitra = mongoose.model("Mitra", mitraSchema, "Mitra");

module.exports = Mitra;
