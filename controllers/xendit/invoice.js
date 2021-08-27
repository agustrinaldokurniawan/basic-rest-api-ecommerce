const xendit = require("xendit-node");

const secretKey = process.env.XENDIT_DEV;
const x = new xendit({
  secretKey,
});

class XenditInvoiceController {
  static async create(req, res) {
    try {
      const {
        external_id,
        amount,
        description,
        payer_email,
        customer,
        customer_notification_preference,
      } = req.body;

      const should_send_email = false; //if not set, default will be false and email wont be sent
      const success_redirect_url = ""; //callback when payment is success
      const failure_redirect_url = ""; //callback when payment is failed
      // const payment_methods = ["BNI", "BCA"] //to determine which payment method is shown to user
      const fixed_va = true; //true for single use VA number

      const { Invoice } = x;
      const invoiceSpecificOptions = {};
      const i = new Invoice(invoiceSpecificOptions);

      const resp = await i
        .createInvoice({
          externalID: external_id,
          amount,
          description,
          payerEmail: payer_email,
          shouldSendEmail: should_send_email,
          customer,
          customer_notification_preference: customer_notification_preference,
          fixed_va,
        })
        .catch((error) => {
          throw new Error(error);
        });

      return res.json({ resp });
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  static async getById(req, res) {
    try {
      const { id } = req.params;

      const { Invoice } = x;
      const invoiceSpecificOptions = {};
      const i = new Invoice(invoiceSpecificOptions);

      const resp = await i
        .getInvoice({
          invoiceID: id,
        })
        .catch((error) => {
          throw new Error(error);
        });

      return res.json({ resp });
    } catch (error) {
      return res.status(500).json(error);
    }
  }
  //   static async expireInvoice(req, res){
  //       try {
  //           const
  //         const { Invoice } = x;
  //         const invoiceSpecificOptions = {};
  //         const i = new Invoice(invoiceSpecificOptions);

  //         const resp = await i.expireInvoice({
  //           invoiceID: '587cc7b4863f2b462beb31f6',
  //         });
  //         console.log(resp);
  //       } catch (error) {
  //           return res.status(500).json(error)
  //       }
  //   }
}

module.exports = XenditInvoiceController;
