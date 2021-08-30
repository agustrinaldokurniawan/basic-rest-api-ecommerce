const express = require("express");
const NotificationControllers = require("../controllers/notification");
const route = express.Router();

route
  .get("/all", NotificationControllers.get)
  .get("/getById/:id", NotificationControllers.getById)
  .post("/create", NotificationControllers.create)
  .put("/update", NotificationControllers.update)
  .delete("/delete", NotificationControllers.delete);

module.exports = route;
