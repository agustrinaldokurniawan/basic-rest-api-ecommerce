const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();

const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

try {
  const connectMongoose = mongoose
    .connect("mongodb://localhost:27017/first", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .catch((err) => {
      throw new Error(err);
    });

  if (connectMongoose) console.log("Mongoose Connected");

  const app = express();

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  const {
    route: userRoutes,
    openapiSpecification: userSpec,
  } = require("./routes/user");

  const mediaRoutes = require("./routes/media");
  const {
    route: blogRoutes,
    openapiSpecification: blogSpec,
  } = require("./routes/blog");

  const addressRoutes = require("./routes/address");
  const paymentRoutes = require("./routes/payment");

  app.use("/users", userRoutes);
  app.use("/media", mediaRoutes);
  app.use("/blog", blogRoutes);
  app.use("/address", addressRoutes);
  app.use("/blog", blogRoutes);
  app.use("/payment", paymentRoutes);

  app.use("/api-docs/user", swaggerUi.serve, swaggerUi.setup(userSpec));
  app.use("/api-docs/blog", swaggerUi.serve, swaggerUi.setup(blogSpec));

  const server = app.listen(3000);
  if (server) console.log("Server running is success");
} catch (error) {
  console.log(error);
}
