const fs = require("fs");
const multer = require("multer");

class MediaController {
  static async getImage(req, res) {
    try {
      const { filepath } = req.params;
      const type = await filepath.split(".").pop();

      const fileExists = await fs.existsSync(`assets/${filepath}`);

      if (!fileExists) {
        const data = await fs.readFileSync("assets/notfound.png");

        throw {
          status: 404,
          data,
          type: "png",
          res,
        };
      }

      const data = await fs.readFileSync(`assets/${filepath}`);
      res.writeHead(200, { "Content-Type": `image/${type}` });
      return res.end(data);
    } catch (error) {
      res.writeHead(error.status, { "Content-Type": `image/${error.type}` });
      return res.end(error.data);
    }
  }
  static async uploadSingleImage(req, res) {
    try {
      const file = req.file;

      if (!file) {
        throw {
          message: "File failed to upload",
          status: 500,
        };
      }

      const fileUri = `localhost:3000/media/image/${file.filename}`;
      return res.json({
        message: "File uploaded",
        url: fileUri,
      });
      return;
    } catch (error) {
      return res.status(error.status).json(error);
    }
  }
}

module.exports = MediaController;
