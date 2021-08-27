const express = require("express");
const XenditTransferController = require("../../controllers/xendit/transfer");
const route = express.Router();

route.post("/create", XenditTransferController.createTransfer);

module.exports = route;
