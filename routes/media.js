const express = require("express");
const MediaController = require("../controllers/media");
const { upload } = require("../helper/multerConfig");
const route = express.Router();

route
  .get("/image/:filepath", MediaController.getImage)
  .post(
    "/image",
    upload.single("image_file"),
    MediaController.uploadSingleImage
  );

module.exports = route;
