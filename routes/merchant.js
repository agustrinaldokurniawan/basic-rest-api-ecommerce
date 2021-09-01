const express = require("express");
const MerchantController = require("../controllers/merchant");
const route = express.Router();

route
  .post("/signup", MerchantController.signup)
  .post("/withdraw", MerchantController.withdraw);

module.exports = route;
