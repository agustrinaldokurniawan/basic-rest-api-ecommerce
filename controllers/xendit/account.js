const axios = require("axios").default;
const key = `${process.env.XENDIT_DEV}:`;
const base_url = "https://api.xendit.co/v2/accounts";

const xendit = require("xendit-node");

const secretKey = process.env.XENDIT_DEV;
const x = new xendit({
  secretKey,
});

const base64 = Buffer.from(key).toString("base64");

class XenditAccountController {
  static async getById(req, res) {
    try {
      const { id } = req.params;

      axios({
        method: "get",
        url: `${base_url}/${id}`,
        headers: {
          Authorization: `Basic ${base64}`,
        },
      })
        .then((response) => {
          return res.json({ response: response.data });
        })
        .catch((error) => {
          return res.status(500).json({ error: error.data });
        });
    } catch (error) {
      return res.status(500).json(error);
    }
  }
  static async create(req, res) {
    try {
      const { email, type, business_profile } = req.body;

      const { Platform } = x;
      const platformSpecificOptions = {};
      const p = new Platform(platformSpecificOptions);

      p.createAccount({
        accountEmail: email,
        type: type, //OWNED for live testmode,
        businessProfile: business_profile, // object
      })
        .then(({ user_id }) => {
          return res.json({ user: user_id });
        })
        .catch((e) => {
          return res.status(500).json(e.message);
        });
    } catch (error) {
      return res.status(500).json(error);
    }
  }
  static async updateAccount(req, res) {
    try {
      const { id, email, businessName } = req.body;

      axios({
        method: "patch",
        url: `${base_url}/${id}`,
        headers: {
          Authorization: `Basic ${base64}`,
        },
        data: {
          email,
          public_profile: {
            business_name: businessName,
          },
        },
      })
        .then((response) => {
          return res.json({ response: response.data });
        })
        .catch((error) => {
          console.log({ error });
          return res.status(500).json({ error: error.data });
        });
    } catch (error) {
      return res.status(500).json(error);
    }
  }
  static async getBalance(req, res) {
    try {
      const { id } = req.query;

      axios({
        method: "get",
        url: `https://api.xendit.co/balance`,
        headers: {
          Authorization: `Basic ${base64}`,
          "for-user-id": id,
        },
      })
        .then((response) => {
          return res.json({ response: response.data });
        })
        .catch((error) => {
          return res.status(500).json({ error: error.data });
        });
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}

module.exports = XenditAccountController;
