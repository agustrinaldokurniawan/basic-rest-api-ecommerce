const Merchant = require("../models/merchant");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const secretKey = process.env.XENDIT_DEV;
const xendit = require("xendit-node");
const { default: axios } = require("axios");
const Bank = require("../models/bank");
const x = new xendit({
  secretKey,
});

const base64 = Buffer.from(`${secretKey}:`).toString("base64");

class MerchantController {
  static async signup(req, res) {
    try {
      const { email, password, storeName } = req.body;
      let type = "OWNED";

      const existMerchant = await Merchant.exists({
        "loginInfo.merchantEmail": email,
      });

      if (existMerchant) {
        throw { message: "Email already registered" };
      }

      const { Platform } = x;
      const platformSpecificOptions = {};
      const p = new Platform(platformSpecificOptions);

      const xenditAccount = await p
        .createAccount({
          accountEmail: email,
          type,
          businessProfile: {
            businessName: storeName,
          },
        })
        .catch((error) => {
          throw {
            error,
            message: "Error while create xendit account for merchant",
          };
        });

      const xenditAccountId = await xenditAccount.user_id;

      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const newMerchant = await Merchant.create({
        merchantCoreInfo: {
          storeName,
        },
        virtualAccountInfo: {
          xenditVirtualAccount: xenditAccountId,
        },
        loginInfo: {
          merchantEmail: email,
          password: hashedPassword,
        },
      }).catch((error) => {
        throw { error, message: "Error while create merchant" };
      });

      return res.json(newMerchant);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
  static async withdraw(req, res) {
    try {
      const { merchantId, amount, bankCode } = await req.body;
      const description = "Withdraw";

      const merchant = await Merchant.findById(merchantId);
      if (!merchant) {
        throw {
          message: "Merchant not found",
        };
      }

      const merchantXenditAccountId = await merchant.virtualAccountInfo
        .xenditVirtualAccount;

      const xenditHeaders = await {
        Authorization: `Basic ${base64}`,
        "for-user-id": merchantXenditAccountId,
      };

      const balance = await axios
        .get("https://api.xendit.co/balance", {
          headers: xenditHeaders,
        })
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          throw {
            error,
            message: "Error while get balance merchant",
          };
        });

      const minimumBalance = 50000;
      const balanceAfterWithdraw = balance.balance - amount;

      if (balanceAfterWithdraw < minimumBalance) {
        throw {
          message: "Minimum saldo should be Rp 50.000",
        };
      }

      const merchantBankInfo = await Bank.findOne({
        owner: merchantId,
        code: bankCode,
      });

      if (!merchantBankInfo) {
        throw {
          message: "You need to register bank info to your accound",
        };
      }

      const payloadDisbursement = {
        external_id: merchantId,
        amount,
        bank_code,
        account_holder_name: merchantBankInfo.accountHolderName,
        account_number: merchantBankInfo.accountNumber,
        description,
      };

      axios
        .post(
          "https://api.xendit.co/disbursements",
          {
            headers: {
              Authorization: `Basic ${base64}`,
              "for-user-id": merchantXenditAccountId,
            },
          },
          payloadDisbursement
        )
        .then((response) => {
          console.log({ response });
          return res.json(response);
        })
        .catch((error) => {
          console.log({ error });
          throw {
            error: error,
            message: "Error while create disbursement",
          };
        });

      // return res.json(createdDisbursement);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}

module.exports = MerchantController;
