const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema({
  userCoreInfo: {
    firebaseToken: {
      type: String,
      default: "",
    },
    phoneNumber: {
      type: String,
      required: [true, "Phone Number must be Included"],
    },
    fullName: {
      type: String,
      default: "",
    },
    avatarUrl: {
      type: String,
      default: "",
    },
    joinDate: {
      type: Date,
      default: Date.now,
    },
    isMitra: {
      type: Boolean,
      default: false,
    },
    userLevel: {
      type: String,
      enum: ["NEWBIE", "NICE", "KIND", "SUPER", "LOYAL", "BOSSMAN"],
      default: "NEWBIE",
    },
    mitraData: {
      type: "ObjectId",
      ref: "Mitra",
    },
  },
  loginInfo: {
    email: {
      type: String,
      unique: true,
      required: [true, "Email Must Be Included"],
    },
    password: {
      type: String,
      unique: true,
      required: [true, "Password Must Not Be blank"],
    },
  },
  linkedReferralCode: {
    type: String,
    default: "",
  },
  Device: {
    fcmToken: {
      type: String,
      default: "",
    },
    deviceType: {
      type: String,
      enum: ["android", "ios", "web", ""],
      default: "",
    },
    deviceModel: {
      type: String,
      default: "",
    },
    ipAddress: {
      type: String,
      default: "",
    },
    last_token: {
      type: String,
      default: "",
    },
  },
  currentPointBalance: {
    type: String,
    default: "0",
  },
  address: [
    {
      type: "ObjectId",
      ref: "Address",
    },
  ],
  pointHistory: [
    {
      type: "ObjectId",
      ref: "PointHistory",
    },
  ],
  userBankInfo: [
    {
      type: "ObjectId",
      ref: "Bank",
    },
  ],
  orderWaitingConfirm: [
    {
      type: "ObjectId",
      ref: "Order",
    },
  ],
  orderWaitingPayment: [
    {
      type: "ObjectId",
      ref: "Order",
    },
  ],
  orderOnProcessByMerchant: [
    {
      type: "ObjectId",
      ref: "Order",
    },
  ],
  orderOnShippment: [
    {
      type: "ObjectId",
      ref: "Order",
    },
  ],
  orderHistory: [
    {
      type: "ObjectId",
      ref: "Order",
    },
  ],
  orderComplained: [
    {
      type: "ObjectId",
      ref: "Order",
    },
  ],
  chat: [
    {
      type: "ObjectId",
      ref: "Chat",
    },
  ],
  wishList: [
    {
      type: "ObjectId",
      ref: "Product",
    },
  ],
  cart: [
    {
      type: "ObjectId",
      ref: "Cart",
    },
  ],
  notification: [
    {
      type: "ObjectId",
      ref: "Notification",
    },
  ],
});
const User = mongoose.model("User", userSchema, "User");

module.exports = User;
