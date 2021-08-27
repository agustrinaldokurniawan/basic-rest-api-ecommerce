const express = require("express");
const UserController = require("../controllers/user");
const route = express.Router();
const swaggerJsdoc = require("swagger-jsdoc");

const option = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "User",
      version: "1.0.0",
    },
  },
  apis: ["./routes/user.js"],
};

const openapiSpecification = swaggerJsdoc(option);

/**
 * @openapi
 * /login:
 *   post:
 *     description: Welcome to swagger-jsdoc!
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */

route
  .post("/signup", UserController.signup)
  .post("/login", UserController.signin);

module.exports = { route, openapiSpecification };
