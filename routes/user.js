const express = require("express");
const UserController = require("../controllers/user");
const route = express.Router();

route
  .post("/signup", UserController.signup)
  .post("/login", UserController.signin)
  .post("/create/seller", UserController.createSeller)
  .post("/create/mitra", UserController.createMitra)
  .post("/create/kozii", UserController.createKozii)
  .post("/create/merchant", UserController.createMerchant);

module.exports = route;
