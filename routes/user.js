const express = require("express");
const UserController = require("../controllers/user");
const route = express.Router();

route
  .post("/signup", UserController.signup)
  .post("/login", UserController.signin);

module.exports = route;
