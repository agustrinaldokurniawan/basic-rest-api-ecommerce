const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MERCHANT_TYPE = ["OFFICIAL", "UMKM"];
const MERCHANT_LEVEL = ["RUBY", "SAPPHIRE", "EMERALD", "DIAMOND"];

const merchantSchema = new Schema({
  merchantCoreInfo: {
    officialDomain: {
      type: String,
      default: "",
    },
    firebaseToken: {
      type: String,
      default: "",
    },
    storeName: {
      type: String,
      default: "",
    },
    phoneNumber: {
      type: String,
      default: "",
    },
    joinedDate: {
      type: Date,
      default: Date.now,
    },
    personInCharge: {
      type: String,
    },
  },
  merchantStoreStyle: {
    bannerSliderOne: {
      type: String,
      default: "",
    },
    bannerSliderTwo: {
      type: String,
      default: "",
    },
    bannerSliderThree: {
      type: String,
      default: "",
    },
    merchantPromoImageOne: {
      type: String,
      default: "",
    },
    merchantPromoImageTwo: {
      type: String,
      default: "",
    },
    merchantPromoImageThree: {
      type: String,
      default: "",
    },
    merchantImageUrl: {
      type: String,
      default: "",
    },
    merchantHeaderUrl: {
      type: String,
      default: "",
    },
  },
  loginInfo: {
    merchantEmail: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
  },
  merchantStatus: {
    merchantType: {
      type: String,
      enum: MERCHANT_TYPE,
      default: "OFFICIAL",
    },
    merchantLevel: {
      type: String,
      enum: MERCHANT_LEVEL,
      default: "RUBY",
    },
  },
  virtualAccountInfo: {
    xenditVirtualAccount: {
      type: String,
      default: "",
    },
    virtualAccountBalance: {
      type: String,
      default: "0",
    },
  },
  socialMedia: {
    instagram: {
      type: String,
      default: "",
    },
    facebook: {
      type: String,
      default: "",
    },
  },
  activeInfo: {
    lastLogin: {
      type: Date,
    },
    isOnline: {
      type: Boolean,
      default: false,
    },
  },
  merchantRatings: {
    type: Number,
    min: 0,
    default: 0,
  },
  deductmentBill: [
    {
      type: "ObjectId",
      ref: "DeductMerchant",
    },
  ],
  merchantNotes: [
    {
      type: "ObjectId",
      ref: "MerchantNotes",
    },
  ],
  activeProduct: [
    {
      type: "ObjectId",
      ref: "Product",
    },
  ],
  deactivedProduct: [
    {
      type: "ObjectId",
      ref: "Product",
    },
  ],
  outOfStockProduct: [
    {
      type: "ObjectId",
      ref: "Product",
    },
  ],
  bestSellingProduct: [
    {
      type: "ObjectId",
      ref: "Product",
    },
  ],
  orderWaitingPayment: [
    {
      type: "ObjectId",
      ref: "Order",
    },
  ],
  orderWaitingConfirm: [
    {
      type: "ObjectId",
      ref: "Order",
    },
  ],
  orderOnProcess: [
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
  merchantAddress: [
    {
      type: "ObjectId",
      ref: "Address",
    },
  ],
  defaultAddress: {
    type: "ObjectId",
    ref: "Address",
    default: null,
  },
  bankInfo: [
    {
      type: "ObjectId",
      ref: "Bank",
    },
  ],
  chat: [
    {
      type: "ObjectId",
      ref: "Chat",
    },
  ],
  notification: [
    {
      type: "ObjectId",
      ref: "Notification",
    },
  ],
  feeds: [
    {
      type: "ObjectId",
      ref: "Feeds",
    },
  ],
  followers: [
    {
      type: "ObjectId",
      ref: "User",
    },
  ],
  followersCount: {
    type: Number,
    default: 0,
    min: 0,
  },
});
const Merchant = mongoose.model("Merchant", merchantSchema, "Merchant");

module.exports = Merchant;
