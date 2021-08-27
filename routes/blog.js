const express = require("express");
const BlogController = require("../controllers/blog");
const route = express.Router();
route
  .post("/create", BlogController.createBlog)
  .get("/all", BlogController.getAllBlog)
  .get("/titleByQuery", BlogController.getBlogTitleByQuery);

module.exports = route
