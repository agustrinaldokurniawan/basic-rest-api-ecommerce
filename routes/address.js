const express = require("express");
const AddressController = require("../controllers/address");
const route = express.Router();

route
  .post("/add", AddressController.addAddress)
  .post("/remove", AddressController.removeAddress);

module.exports = route;
