const express = require("express");
const XenditAccountController = require("../../controllers/xendit/account");
const route = express.Router();

route
  .get("/getById/:id", XenditAccountController.getById) // still Error
  .post("/create", XenditAccountController.create)
  .post("/update", XenditAccountController.updateAccount)
  .get("/balance", XenditAccountController.getBalance);

module.exports = route;
