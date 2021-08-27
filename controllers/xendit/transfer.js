const axios = require("axios").default;

class XenditTransferController {
  static async createTransfer(req, res) {
    try {
      const { reference, amount, source_user_id, destination_user_id } =
        req.body;

      //   {
      //     "reference":"123456",
      //     "amount":100000,
      //     "source_user_id":"60f93c954ada1254cae9f7b1",
      //     "destination_user_id":"6128d120a4a4862740e9345b"
      // }

      const key = `${process.env.XENDIT_DEV}:`;
      const base64 = await Buffer.from(key).toString("base64");

      axios({
        method: "post",
        url: `https://api.xendit.co/transfers`,
        headers: {
          Authorization: `Basic ${base64}`,
        },
        data: {
          reference,
          amount,
          source_user_id,
          destination_user_id,
        },
      })
        .then((response) => {
          //   {
          //     "response": {
          //         "created": "2021-08-27T14:08:41.520Z",
          //         "transfer_id": "5069fede-1a0d-4a8e-86a7-fa068babe883",
          //         "reference": "123456",
          //         "source_user_id": "60f93c954ada1254cae9f7b1",
          //         "destination_user_id": "6128d120a4a4862740e9345b",
          //         "status": "SUCCESSFUL",
          //         "amount": 100000
          //     }
          // }

          return res.json({ response: response.data });
        })
        .catch((error) => {
          console.log(error);
          return res.status(500).json({ error: error.data });
        });
    } catch (error) {}
  }
}

module.exports = XenditTransferController;
