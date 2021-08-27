const express = require("express");
const XenditInvoiceController = require("../../controllers/xendit/invoice");
const route = express.Router();

route
  .post("/create", XenditInvoiceController.create)
  .get("/getById/:id", XenditInvoiceController.getById)
  // .post("/createBySubAccount", XenditInvoiceController.createInvoiceSubAccount)
  // .get(
  //   "/getInvoiceSubAccountById",
  //   XenditInvoiceController.getInvoiceSubAccount
  // )
  .post("/callback", XenditInvoiceController.invoiceCallback);

module.exports = route;
