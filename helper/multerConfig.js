const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "assets/");
  },
  filename: (req, file, cb) => {
    const filenameField = file.fieldname;
    const uniqueId = Date.now();
    const fullFilename = `${filenameField}-${uniqueId}`;
    cb(null, fullFilename + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

module.exports = { upload };
