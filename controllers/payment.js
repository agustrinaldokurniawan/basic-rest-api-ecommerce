const xendit = require("xendit-node");
const XenditHelper = require("../helper/xenditHelper");
class PaymentController {
  static async getBank(req, res) {
    try {
      const x = new xendit({ secretKey: process.env.XENDIT_DEV });
      const { VirtualAcc } = x;
      const vaSpecificOptions = {};
      const va = new VirtualAcc(vaSpecificOptions);

      const resp = await va.getVABanks().catch((error) => {
        throw {
          message: "Error while fetch available Bank",
          error,
        };
      });
      return res.json({ resp });
    } catch (error) {
      return res.status(error.status || 500).json(error);
    }
  }
  static async createVA(req, res) {
    try {
      const { bankCode, externalID, name, expectedAmt } = req.body;

      if (!bankCode) {
        throw {
          message: "Bank Code is require. (Ex: BNI, BCA, BRI)",
          status: 400,
        };
      }

      if (!externalID) {
        throw {
          message: "External ID is required",
          status: 400,
        };
      }

      const validateExtId = await XenditHelper.extIDValidationVA(externalID);
      if (!validateExtId) {
        throw {
          message:
            "External ID length min is 1 character and max is 950 characters",
        };
      }
      if (!expectedAmt) {
        throw {
          message: "Expected Amount is required",
          status: 400,
        };
      }
      const validateExpectedAmt = await XenditHelper.expectedAmt(expectedAmt);
      if (!validateExpectedAmt) {
        throw {
          message:
            "Expected Amount minimum is 1 and maximum is Rp 50.000.000.000",
        };
      }

      if (!name) {
        throw {
          message: "Bank Code is require. (Ex: BNI, BCA, BRI)",
          status: 400,
        };
      }

      const validateName = await XenditHelper.nameValidation(name);
      if (!validateName) {
        throw { message: "Invalid name format. (only accept alphabet)" };
      }

      const x = new xendit({ secretKey: process.env.XENDIT_DEV });
      const { VirtualAcc } = x;
      const vaSpecificOptions = {};
      const va = new VirtualAcc(vaSpecificOptions);

      const resp = await va
        .createFixedVA({
          externalID,
          bankCode,
          name,
          expectedAmt,
        })
        .catch((error) => {
          throw {
            message: "Something wrong while create VA number",
            error,
          };
        });

      return res.json({ resp });
    } catch (error) {
      return res.status(500).json(error);
    }
  }
  static async getVA(req, res) {
    try {
      const { id } = req.query;

      if (!id) {
        throw {
          message: "ID of VA is required",
        };
      }

      const x = new xendit({ secretKey: process.env.XENDIT_DEV });
      const { VirtualAcc } = x;
      const vaSpecificOptions = {};
      const va = new VirtualAcc(vaSpecificOptions);

      const resp = await va.getFixedVA({ id }).catch((error) => {
        throw {
          message: "Wrong ID, VA not found",
          error,
        };
      });
      return res.json({ resp });
    } catch (error) {
      return res.status(error.status || 500).json(error);
    }
  }
  static async createDisbursement(req, res) {
    try {
      const {
        externalID,
        amount,
        bankCode,
        accountHolderName,
        accountNumber,
        description,
      } = req.body;

      if (!bankCode) {
        throw {
          message: "Bank Code is require. (Ex: BNI, BCA, BRI)",
          status: 400,
        };
      }
      if (!externalID) {
        throw {
          message: "ExternalID is required",
          status: 400,
        };
      }
      const validateExtId = await XenditHelper.extIDValidationDisbursement(
        externalID
      );
      if (!validateExtId) {
        throw {
          message:
            "External ID length min is 1 character and max is 950 characters",
        };
      }

      if (!amount) {
        throw {
          message: "Account Holder Name is required",
          status: 400,
        };
      }

      if (!accountNumber) {
        throw {
          message: "Account Number is required",
          status: 400,
        };
      }
      const validateAccNumber =
        await XenditHelper.accountNumberValidationGeneral(accountNumber);
      if (!validateAccNumber) {
        throw {
          message: "Account Number length minimum is 1",
        };
      }

      if (bankCode === "BCA") {
        const validateAccNumberBCA =
          await XenditHelper.accountNumberValidationBCA(accountNumber);
        if (!validateAccNumberBCA) {
          throw {
            message: "Account Number length required is 10",
          };
        }
      }

      if (!accountHolderName) {
        throw {
          message: "Account Holder Number is required",
          status: 400,
        };
      }

      const validateAccHolderName =
        await XenditHelper.accountHolderNameValidation(accountHolderName);
      if (!validateAccHolderName) {
        throw {
          message:
            "Invalid name format. (only accept alphanumeri) with length minimum is 1",
        };
      }

      if (!description) {
        throw {
          message: "Description is required",
          status: 400,
        };
      }
      const x = new xendit({ secretKey: process.env.XENDIT_DEV });
      const { Disbursement } = x;
      const disbursementSpecifyOptions = {};
      const d = new Disbursement(disbursementSpecifyOptions);

      const resp = await d.create({
        externalID,
        amount,
        bankCode,
        accountHolderName,
        accountNumber,
        description,
      });

      return res.json({ resp });
    } catch (error) {
      return res.status(error.status || 500).json(error);
    }
  }
  static async getDisbursement(req, res) {
    try {
      const { id } = req.query;

      const x = new xendit({ secretKey: process.env.XENDIT_DEV });
      const { Disbursement } = x;
      const disbursementSpecificOptions = {};
      const d = new Disbursement(disbursementSpecificOptions);

      const resp = await d.getByID({ disbursementID: id });

      return res.json({ resp });
    } catch (error) {
      return res.status(error.status || 500).json(error);
    }
  }
  static async createInvoice(req, res) {
    try {
      const { externalID, amount, payerEmail, description } = req.body;

      const x = new xendit({ secretKey: process.env.XENDIT_DEV });

      if (!externalID) {
        throw {
          message: "External ID is required",
        };
      }

      if (!amount) {
        throw {
          message: "Amount is required",
        };
      }

      if (!payerEmail) {
        throw {
          message: "Email Payer is required",
        };
      }

      if (!description) {
        throw {
          message: "Description is required",
        };
      }

      const { Invoice } = x;
      const invoiceSpecificOptions = {};
      const i = new Invoice(invoiceSpecificOptions);

      const resp = await i
        .createInvoice({
          externalID,
          amount,
          payerEmail,
          description,
        })
        .catch((error) => {
          throw {
            message: "Something wrong while create Invoice",
            error,
          };
        });

      return res.json({ resp });
    } catch (error) {
      return res.status(error.status || 500).json(error);
    }
  }
}

module.exports = PaymentController;
