const express = require("express");
const FeedControllers = require("../controllers/feeds");
const route = express.Router();

route
  .get("/all", FeedControllers.get)
  .get("/getById/:id", FeedControllers.getById)
  .post("/create", FeedControllers.create)
  .put("/update", FeedControllers.update)
  .delete("/delete", FeedControllers.delete);

module.exports = route;
