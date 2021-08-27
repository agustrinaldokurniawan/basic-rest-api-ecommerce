const express = require("express");
const EmailController = require("../controllers/email");
const route = express.Router();

route.post("/sendMail", EmailController.sendMail);

module.exports = route;
