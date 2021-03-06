const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();

try {
  const connectMongoose = mongoose
    .connect("mongodb://localhost:27017/first", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    .catch((err) => {
      throw new Error(err);
    });

  if (connectMongoose) console.log("Mongoose Connected");

  const app = express();

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  const userRoutes = require("./routes/user");
  const mediaRoutes = require("./routes/media");
  const blogRoutes = require("./routes/blog");
  const addressRoutes = require("./routes/address");
  const paymentRoutes = require("./routes/payment");
  const emailRoutes = require("./routes/email");
  const feedRoutes = require("./routes/feed");
  const notifRoutes = require("./routes/notification");

  const merchantRoutes = require("./routes/merchant");

  const bankRoutes = require("./routes/bank");

  const xenditInvoice = require("./routes/xendit/invoice");
  const xenditAccount = require("./routes/xendit/account");
  const xenditTransfer = require("./routes/xendit/transfer");

  app.use("/users", userRoutes);
  app.use("/media", mediaRoutes);
  app.use("/blog", blogRoutes);
  app.use("/address", addressRoutes);
  app.use("/blog", blogRoutes);
  app.use("/payment", paymentRoutes);
  app.use("/email", emailRoutes);
  app.use("/feed", feedRoutes);
  app.use("/notif", notifRoutes);

  app.use("/merchant", merchantRoutes);

  app.use("/bank", bankRoutes);

  app.use("/xendit/invoice", xenditInvoice);
  app.use("/xendit/account", xenditAccount);
  app.use("/xendit/transfer", xenditTransfer);

  const server = app.listen(3000);
  if (server) console.log("Server running is success");
} catch (error) {
  console.log(error);
}
