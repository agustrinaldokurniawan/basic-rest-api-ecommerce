const Merchant = require("../models/merchant");
const User = require("../models/user");
const Bank = require("../models/bank");

class BankController {
  static async addCard(req, res) {
    try {
      const { ownerId, code, accountNumber, userType, accountHolderName } =
        await req.body;
      let user;

      if (userType === "MERCHANT") {
        user = await Merchant.findById(ownerId).exec();
        if (!user) {
          throw {
            message: "User not found",
          };
        }
      }
      if (userType === "USER") {
        user = await User.findById(ownerId).exec();
        if (!user) {
          throw {
            message: "User not found",
          };
        }
      }

      const newCard = await Bank.create({
        owner: ownerId,
        code,
        accountNumber,
        type: userType,
        accountHolderName,
      }).catch((error) => {
        throw { error, message: "Error while add card" };
      });

      if (userType === "MERCHANT") {
        await user.bankInfo.push(newCard);
      }
      if (userType === "USER") {
        await user.userBankInfo.push(newCard);
      }

      await user.save().catch((error) => {
        throw {
          error,
          message: "Error while add card to user",
        };
      });

      return res.json(newCard);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}

module.exports = BankController;
