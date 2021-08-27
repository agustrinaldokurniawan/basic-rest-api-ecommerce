const xendit = require("xendit-node");
const axios = require("axios").default;

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

      //   {
      //     "external_id":"123456",
      //     "amount":1000000,
      //     "description":"This is description about this payment",
      //     "payer_email":"agustkurniawan010899@gmail.com",
      //     "customer":{
      //         "given_names":"Agust",
      //         "email":"agustrinaldokurniawan@gmail.com",
      //         "mobile_number":"+6289638672690"
      //     },
      //     "customer_notification_preference":{
      //         "invoice_created":["whatsapp", "sms", "email"]
      //     }
      // }

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

      //   {
      //     "resp": {
      //         "id": "6128942073e24f76ad9b343c",
      //         "external_id": "123456",
      //         "user_id": "60f93c954ada1254cae9f7b1",
      //         "status": "PENDING",
      //         "merchant_name": "PT Kozii Emas Nusantara",
      //         "merchant_profile_picture_url": "https://xnd-companies.s3.amazonaws.com/prod/1626946964643_265.jpg",
      //         "amount": 1000000,
      //         "payer_email": "agustkurniawan010899@gmail.com",
      //         "description": "This is description about this payment",
      //         "expiry_date": "2021-08-28T07:28:31.020Z",
      //         "invoice_url": "https://checkout-staging.xendit.co/web/6128942073e24f76ad9b343c",
      //         "available_banks": [
      //             {
      //                 "bank_code": "MANDIRI",
      //                 "collection_type": "POOL",
      //                 "bank_account_number": "8860824075633",
      //                 "transfer_amount": 1000000,
      //                 "bank_branch": "Virtual Account",
      //                 "account_holder_name": "PT KOZII EMAS NUSANTARA",
      //                 "identity_amount": 0
      //             },
      //             {
      //                 "bank_code": "BRI",
      //                 "collection_type": "POOL",
      //                 "bank_account_number": "9200199779975",
      //                 "transfer_amount": 1000000,
      //                 "bank_branch": "Virtual Account",
      //                 "account_holder_name": "PT KOZII EMAS NUSANTARA",
      //                 "identity_amount": 0
      //             },
      //             {
      //                 "bank_code": "BNI",
      //                 "collection_type": "POOL",
      //                 "bank_account_number": "880825873413",
      //                 "transfer_amount": 1000000,
      //                 "bank_branch": "Virtual Account",
      //                 "account_holder_name": "PT KOZII EMAS NUSANTARA",
      //                 "identity_amount": 0
      //             },
      //             {
      //                 "bank_code": "PERMATA",
      //                 "collection_type": "POOL",
      //                 "bank_account_number": "729377570244",
      //                 "transfer_amount": 1000000,
      //                 "bank_branch": "Virtual Account",
      //                 "account_holder_name": "PT KOZII EMAS NUSANTARA",
      //                 "identity_amount": 0
      //             },
      //             {
      //                 "bank_code": "BCA",
      //                 "collection_type": "POOL",
      //                 "bank_account_number": "1076618618250",
      //                 "transfer_amount": 1000000,
      //                 "bank_branch": "Virtual Account",
      //                 "account_holder_name": "PT KOZII EMAS NUSANTARA",
      //                 "identity_amount": 0
      //             }
      //         ],
      //         "available_retail_outlets": [
      //             {
      //                 "retail_outlet_name": "ALFAMART",
      //                 "payment_code": "TEST436058",
      //                 "transfer_amount": 1000000
      //             },
      //             {
      //                 "retail_outlet_name": "INDOMARET",
      //                 "payment_code": "TEST200755",
      //                 "transfer_amount": 1000000
      //             }
      //         ],
      //         "available_ewallets": [
      //             {
      //                 "ewallet_type": "OVO"
      //             },
      //             {
      //                 "ewallet_type": "DANA"
      //             },
      //             {
      //                 "ewallet_type": "SHOPEEPAY"
      //             },
      //             {
      //                 "ewallet_type": "LINKAJA"
      //             }
      //         ],
      //         "should_exclude_credit_card": false,
      //         "should_send_email": true,
      //         "created": "2021-08-27T07:28:33.269Z",
      //         "updated": "2021-08-27T07:28:33.269Z",
      //         "currency": "IDR",
      //         "customer": {
      //             "email": "agustkurniawan010899@gmail.com"
      //         },
      //         "customer_notification_preference": {
      //             "invoice_created": [
      //                 "email"
      //             ],
      //             "invoice_reminder": [
      //                 "email"
      //             ],
      //             "invoice_expired": [
      //                 "email"
      //             ],
      //             "invoice_paid": [
      //                 "email"
      //             ]
      //         }
      //     }
      // }

      return res.json({ resp });
    } catch (error) {
      return res.status(500).json(error);
    }
  }
  static async getById(req, res) {
    try {
      const { id } = req.params;
      // id = 61289b5b73e24f71c79b345c

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

      //   {
      //     "resp": {
      //         "id": "61289b5b73e24f71c79b345c",
      //         "external_id": "123456",
      //         "user_id": "60f93c954ada1254cae9f7b1",
      //         "status": "PENDING",
      //         "merchant_name": "PT Kozii Emas Nusantara",
      //         "merchant_profile_picture_url": "https://xnd-companies.s3.amazonaws.com/prod/1626946964643_265.jpg",
      //         "amount": 1000000,
      //         "payer_email": "agustkurniawan010899@gmail.com",
      //         "description": "This is description about this payment",
      //         "expiry_date": "2021-08-28T07:59:21.779Z",
      //         "invoice_url": "https://checkout-staging.xendit.co/web/61289b5b73e24f71c79b345c",
      //         "available_banks": [
      //             {
      //                 "bank_code": "MANDIRI",
      //                 "collection_type": "POOL",
      //                 "bank_account_number": "8860832356999",
      //                 "transfer_amount": 1000000,
      //                 "bank_branch": "Virtual Account",
      //                 "account_holder_name": "PT KOZII EMAS NUSANTARA",
      //                 "identity_amount": 0
      //             },
      //             {
      //                 "bank_code": "BRI",
      //                 "collection_type": "POOL",
      //                 "bank_account_number": "9200118061341",
      //                 "transfer_amount": 1000000,
      //                 "bank_branch": "Virtual Account",
      //                 "account_holder_name": "PT KOZII EMAS NUSANTARA",
      //                 "identity_amount": 0
      //             },
      //             {
      //                 "bank_code": "BNI",
      //                 "collection_type": "POOL",
      //                 "bank_account_number": "880881420414",
      //                 "transfer_amount": 1000000,
      //                 "bank_branch": "Virtual Account",
      //                 "account_holder_name": "PT KOZII EMAS NUSANTARA",
      //                 "identity_amount": 0
      //             },
      //             {
      //                 "bank_code": "PERMATA",
      //                 "collection_type": "POOL",
      //                 "bank_account_number": "729366945356",
      //                 "transfer_amount": 1000000,
      //                 "bank_branch": "Virtual Account",
      //                 "account_holder_name": "PT KOZII EMAS NUSANTARA",
      //                 "identity_amount": 0
      //             },
      //             {
      //                 "bank_code": "BCA",
      //                 "collection_type": "POOL",
      //                 "bank_account_number": "1076693462092",
      //                 "transfer_amount": 1000000,
      //                 "bank_branch": "Virtual Account",
      //                 "account_holder_name": "PT KOZII EMAS NUSANTARA",
      //                 "identity_amount": 0
      //             }
      //         ],
      //         "available_retail_outlets": [
      //             {
      //                 "retail_outlet_name": "ALFAMART",
      //                 "payment_code": "TEST436074",
      //                 "transfer_amount": 1000000
      //             },
      //             {
      //                 "retail_outlet_name": "INDOMARET",
      //                 "payment_code": "TEST200782",
      //                 "transfer_amount": 1000000
      //             }
      //         ],
      //         "available_ewallets": [
      //             {
      //                 "ewallet_type": "OVO"
      //             },
      //             {
      //                 "ewallet_type": "DANA"
      //             },
      //             {
      //                 "ewallet_type": "SHOPEEPAY"
      //             },
      //             {
      //                 "ewallet_type": "LINKAJA"
      //             }
      //         ],
      //         "should_exclude_credit_card": false,
      //         "should_send_email": false,
      //         "created": "2021-08-27T07:59:24.249Z",
      //         "updated": "2021-08-27T07:59:24.249Z",
      //         "currency": "IDR"
      //     }
      // }

      return res.json({ resp });
    } catch (error) {
      return res.status(500).json(error);
    }
  }
  // static async createInvoiceSubAccount(req, res) {
  //   try {
  //     const { id, amount, external_id, payer_email } = req.body;

  //     const key = `${process.env.XENDIT_DEV}:`;
  //     const base64 = await Buffer.from(key).toString("base64");

  //     axios({
  //       method: "post",
  //       url: `https://api.xendit.co/v2/invoices`,
  //       headers: {
  //         Authorization: `Basic ${base64}`,
  //         "for-user-id": id,
  //       },
  //       data: {
  //         external_id,
  //         amount,
  //         external_id,
  //         payer_email,
  //       },
  //     })
  //       .then((response) => {
  //         return res.json({ response: response.data });
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //         return res.status(500).json({ error: error.data });
  //       });
  //   } catch (error) {}
  // }
  // static async getInvoiceSubAccount(req, res) {
  //   try {
  //     const { subAccountId, invoiceId } = req.query;

  //     const key = `${process.env.XENDIT_DEV}:`;
  //     const base64 = await Buffer.from(key).toString("base64");

  //     axios({
  //       method: "get",
  //       url: `https://api.xendit.co/v2/invoices/${invoiceId}`,
  //       headers: {
  //         Authorization: `Basic ${base64}`,
  //         "for-user-id": subAccountId,
  //       },
  //     })
  //       .then((response) => {
  //         return res.json({ response: response.data });
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //         return res.status(500).json({ error: error.data });
  //       });
  //   } catch (error) {}
  // }
  static async invoiceCallback(req, res) {
    try {
      const { body } = req;

      if (!body) {
        throw new Error("Caall Invoice Error");
      }

      console.log("Callback Invoice is called");
      console.log(body);

      // {"body":{"id":"579c8d61f23fa4ca35e52da4","external_id":"invoice_123124123","user_id":"5781d19b2e2385880609791c","is_high":true,"payment_method":"BANK_TRANSFER","status":"PAID","merchant_name":"Xendit","amount":50000,"paid_amount":50000,"bank_code":"PERMATA","paid_at":"2016-10-12T08:15:03.404Z","payer_email":"wildan@xendit.co","description":"This is a description","adjusted_received_amount":47500,"fees_paid_amount":0,"updated":"2016-10-10T08:15:03.404Z","created":"2016-10-10T08:15:03.404Z","currency":"IDR","payment_channel":"PERMATA","payment_destination":"888888888888"}}

      return res.json({ body });
    } catch (error) {
      return res.status(500).json({ error });
    }
  }
}

module.exports = XenditInvoiceController;
