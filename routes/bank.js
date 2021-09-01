const express = require("express");
const BankController = require("../controllers/bank");
const route = express.Router();

route.post("/add", BankController.addCard);

module.exports = route;
