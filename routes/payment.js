const express = require("express");
const PaymentController = require("../controllers/payment");
const route = express.Router();

route
  .get("/getBank", PaymentController.getBank)
  .post("/createVA", PaymentController.createVA)
  .get("/getVA", PaymentController.getVA)
  .post("/createDisbursement", PaymentController.createDisbursement)
  .get("/getDisbursement", PaymentController.getDisbursement)
  .post("/createInvoice", PaymentController.createInvoice);

module.exports = route;
