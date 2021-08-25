const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/first", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const userRoutes = require("./routes/user");
const mediaRoutes = require("./routes/media");
const blogRoutes = require("./routes/blog");
const addressRoutes = require("./routes/address");

app.use("/users", userRoutes);
app.use("/media", mediaRoutes);
app.use("/blog", blogRoutes);
app.use("/address", addressRoutes);

try {
  app.listen(3000, (err) => {
    if (err) {
      throw Error;
    }
    console.log("running server");
  });
} catch (error) {
  return console.log(error);
}
