const User = require("../models/user");
const jwt = require("jsonwebtoken");

const CryptoJS = require("crypto-js");
const secret = "somesecret";

const Kozii = require("../models/kozii");
const Mitra = require("../models/mitra");
const Merchant = require("../models/merchant");

const ValidationHelper = require("../helper/validation");

class UserController {
  static async signup(req, res) {
    try {
      const { nama, email, alamat, password, userID, appPin, device, type } =
        await req.body;

      if (!nama) {
        throw {
          message: "nama is needed",
          status: 400,
        };
      }
      const stringValidate = await ValidationHelper.validateString(nama);
      if (!stringValidate) {
        throw {
          message: "Name doesn't valid",
          status: 400,
        };
      }

      if (!email) {
        throw {
          message: "email is needed",
          status: 400,
        };
      }

      const emailValidate = await ValidationHelper.validateEmail(email);
      if (!emailValidate) {
        throw {
          message: "Email doesn't valid",
          status: 400,
        };
      }

      if (!password) {
        throw {
          message: "password is needed",
          status: 400,
        };
      }
      const passwordValidate = await ValidationHelper.validatePassword(
        password
      );
      if (!passwordValidate) {
        throw {
          message: "Password doesn't valid",
          status: 400,
        };
      }

      const existingUser = await User.find({ email }).limit(1);

      if (existingUser.length > 0) {
        throw {
          message: "Email already been registered",
          existingUser,
          status: 403,
        };
      }

      //encrypt
      var ciphertext = await CryptoJS.AES.encrypt(password, secret).toString();

      const newUser = new User({
        nama,
        email,
        alamat,
        password: ciphertext,
        userID,
        appPin,
        device,
        type,
      });

      await newUser.save().then((docs) => {
        return res.json({ user: docs });
      });
    } catch (error) {
      return res.status(error.status).json(error);
    }
  }

  static async signin(req, res) {
    try {
      const { email, password } = await req.body;

      if (!email) {
        throw {
          message: "email is needed",
          status: 400,
        };
      }
      const emailValidate = await ValidationHelper.validateEmail(email);
      if (!emailValidate) {
        throw {
          message: "Email doesn't valid",
          status: 400,
        };
      }

      if (!password) {
        throw {
          message: "password is needed",
          status: 400,
        };
      }
      const passwordValidate = await ValidationHelper.validatePassword(
        password
      );
      if (!passwordValidate) {
        throw {
          message: "Password doesn't valid",
          status: 400,
        };
      }

      const user = await User.findOne({ email });

      if (!user) {
        throw {
          message: "User not found",
          status: 404,
        };
      }

      //decrypt
      var bytes = await CryptoJS.AES.decrypt(user.password, secret);
      var originalText = await bytes.toString(CryptoJS.enc.Utf8);

      if (password !== originalText) {
        throw {
          message: "Password doesnt match",
          status: 403,
        };
      }

      const token = await jwt.sign(
        {
          exp: Math.floor(Date.now() / 1000) + 60 * 60,
          data: user.email,
        },
        secret
      );

      return res.json({ token });
    } catch (error) {
      return res.status(error.status).json(error);
    }
  }

  static async createSeller(req, res) {
    try {
      const { name, email, levelSeller } = await req.body;

      if (!name || !email || !levelSeller) {
        throw new Error("Some property required is missing");
      }

      const newSeller = await new Seller({
        name,
        email,
        levelSeller,
      });
      console.log({ newSeller });
      if (!newSeller.levelSeller) {
        throw new Error("Error while create new Seller Object");
      }

      await newSeller.save();

      return res.json(newSeller);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  static async createKozii(req, res) {
    try {
      const { name } = req.body;

      const newKozii = new Kozii({
        name,
      });

      await newKozii.save();

      return res.json(newKozii);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
  static async createMitra(req, res) {
    try {
      const { name } = req.body;

      const newMitra = new Mitra({
        name,
      });

      await newMitra.save();

      return res.json(newMitra);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
  static async createMerchant(req, res) {
    try {
      const { name } = req.body;

      const newMerchant = new Merchant({
        name,
      });

      await newMerchant.save();

      return res.json(newMerchant);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
}

module.exports = UserController;
