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
      // id : 6128d15f43fca340204da671
      axios({
        method: "get",
        url: `${base_url}/${id}`,
        headers: {
          Authorization: `Basic ${base64}`,
        },
      })
        .then((response) => {
          //   {
          //     "response": {
          //         "id": "6128d15f43fca340204da671",
          //         "created": "2021-08-27T11:49:51.257Z",
          //         "updated": "2021-08-27T11:49:53.326Z",
          //         "type": "OWNED",
          //         "email": "agustkurniawan01089900@gmail.com",
          //         "public_profile": {
          //             "business_name": "Toko Pertama test123"
          //         },
          //         "country": "ID",
          //         "status": "LIVE"
          //     }
          // }
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
      //   {
      //     "email":"agust1@kurniawan.com",
      //     "type":"MANAGED"
      // }

      const { Platform } = x;
      const platformSpecificOptions = {};
      const p = new Platform(platformSpecificOptions);

      p.createAccount({
        accountEmail: email,
        type: type, //OWNED for live testmode,
        businessProfile: business_profile, // object
      })
        .then(({ user_id }) => {
          //   {
          //     "user": "6128cf3971a03d4032d366be"
          // }
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
      //   {
      //     "id":"6128d120a4a4862740e9345b",
      //     "email":"agustkurniawan010899@gmail.com",
      //     "businessName":"Update Nama Toko Baru"
      // }

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
          //   {
          //     "response": {
          //         "id": "6128d120a4a4862740e9345b",
          //         "created": "2021-08-27T11:48:48.701Z",
          //         "updated": "2021-08-27T12:34:43.203Z",
          //         "type": "OWNED",
          //         "email": "agustkurniawan010899@gmail.com",
          //         "public_profile": {
          //             "business_name": "Update Nama Toko Baru"
          //         },
          //         "country": "ID",
          //         "status": "LIVE"
          //     }
          // }
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
      // id = 6128d15f43fca340204da671

      axios({
        method: "get",
        url: `https://api.xendit.co/balance`,
        headers: {
          Authorization: `Basic ${base64}`,
          "for-user-id": id,
        },
      })
        .then((response) => {
          //   {
          //     "response": {
          //         "balance": 0
          //     }
          // }
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
