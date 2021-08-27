const express = require("express");
const BlogController = require("../controllers/blog");
const route = express.Router();
const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Blog",
      version: "1.0.0",
    },
  },
  apis: ["./routes/blog.js"],
};

const openapiSpecification = swaggerJsdoc(options);

/**
 * @openapi
 * /create:
 *   post:
 *     description: Welcome to swagger-jsdoc!
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */

route
  .post("/create", BlogController.createBlog)
  .get("/all", BlogController.getAllBlog)
  .get("/titleByQuery", BlogController.getBlogTitleByQuery);

module.exports = { route, openapiSpecification };
