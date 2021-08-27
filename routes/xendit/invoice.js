const express = require("express");
const XenditInvoiceController = require("../../controllers/xendit/invoice");
const route = express.Router();

route
  .post("/create", XenditInvoiceController.create)
  .get("/:id", XenditInvoiceController.getById);

module.exports = route;
