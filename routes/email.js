const express = require("express");
const EmailController = require("../controllers/email");
const route = express.Router();

route
  .post("/sendMail", EmailController.sendMail)
  .get("/designs", EmailController.listDesign)
  .get("/designs/:id", EmailController.getDesign)
  .post("/sendMailByDesign", EmailController.sendMailByDesign);

module.exports = route;
