const sgMail = require("@sendgrid/mail");
const { response } = require("express");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

class EmailController {
  //support send single mail and bulkmail
  static async sendMail(req, res) {
    try {
      const { destinationEmails, subject, text, html, senderMail, senderName } =
        req.body;

      //   {
      //     "destinationEmails":["agustkurniawan010899@gmail.com", "agustrinaldokurniawan@gmail.com"],
      //     "senderMail":"no-reply@kozii.id",
      //     "senderName":"Agust",
      //     "subject":"something",
      //     "text":"this is text plain",
      //     "html":"<!doctype html> <html> <head> <meta name='viewport' content='width=device-width'> <meta http-equiv='Content-Type' content='text/html; charset=UTF-8'> <title>Simple Transactional Email</title> <style> /* ------------------------------------- INLINED WITH htmlemail.io/inline ------------------------------------- */ /* ------------------------------------- RESPONSIVE AND MOBILE FRIENDLY STYLES ------------------------------------- */ @media only screen and (max-width: 620px) { table[class=body] h1 { font-size: 28px !important; margin-bottom: 10px !important; } table[class=body] p, table[class=body] ul, table[class=body] ol, table[class=body] td, table[class=body] span, table[class=body] a { font-size: 16px !important; } table[class=body] .wrapper, table[class=body] .article { padding: 10px !important; } table[class=body] .content { padding: 0 !important; } table[class=body] .container { padding: 0 !important; width: 100% !important; } table[class=body] .main { border-left-width: 0 !important; border-radius: 0 !important; border-right-width: 0 !important; } table[class=body] .btn table { width: 100% !important; } table[class=body] .btn a { width: 100% !important; } table[class=body] .img-responsive { height: auto !important; max-width: 100% !important; width: auto !important; } } /* ------------------------------------- PRESERVE THESE STYLES IN THE HEAD ------------------------------------- */ @media all { .ExternalClass { width: 100%; } .ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div { line-height: 100%; } .apple-link a { color: inherit !important; font-family: inherit !important; font-size: inherit !important; font-weight: inherit !important; line-height: inherit !important; text-decoration: none !important; } #MessageViewBody a { color: inherit; text-decoration: none; font-size: inherit; font-family: inherit; font-weight: inherit; line-height: inherit; } .btn-primary table td:hover { background-color: #34495e !important; } .btn-primary a:hover { background-color: #34495e !important; border-color: #34495e !important; } } </style> </head> <body class='' style='background-color: #f6f6f6; font-family: sans-serif; -webkit-font-smoothing: antialiased; font-size: 14px; line-height: 1.4; margin: 0; padding: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;'> <span class='preheader' style='color: transparent; display: none; height: 0; max-height: 0; max-width: 0; opacity: 0; overflow: hidden; mso-hide: all; visibility: hidden; width: 0;'>This is preheader text. Some clients will show this text as a preview.</span> <table border='0' cellpadding='0' cellspacing='0' class='body' style='border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; background-color: #f6f6f6;'> <tr> <td style='font-family: sans-serif; font-size: 14px; vertical-align: top;'> </td> <td class='container' style='font-family: sans-serif; font-size: 14px; vertical-align: top; display: block; Margin: 0 auto; max-width: 580px; padding: 10px; width: 580px;'> <div class='content' style='box-sizing: border-box; display: block; Margin: 0 auto; max-width: 580px; padding: 10px;'> <table class='main' style='border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; background: #ffffff; border-radius: 3px;'> <tr> <td class='wrapper' style='font-family: sans-serif; font-size: 14px; vertical-align: top; box-sizing: border-box; padding: 20px;'> <table border='0' cellpadding='0' cellspacing='0' style='border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;'> <tr> <td style='font-family: sans-serif; font-size: 14px; vertical-align: top;'> <p style='font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px;'>Hi there,</p> <p style='font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px;'>Sometimes you just want to send a simple HTML email with a simple design and clear call to action. This is it.</p> <table border='0' cellpadding='0' cellspacing='0' class='btn btn-primary' style='border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; box-sizing: border-box;'> <tbody> <tr> <td align='left' style='font-family: sans-serif; font-size: 14px; vertical-align: top; padding-bottom: 15px;'> <table border='0' cellpadding='0' cellspacing='0' style='border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: auto;'> <tbody> <tr> <td style='font-family: sans-serif; font-size: 14px; vertical-align: top; background-color: #3498db; border-radius: 5px; text-align: center;'> <a href='http://htmlemail.io' target='_blank' style='display: inline-block; color: #ffffff; background-color: #3498db; border: solid 1px #3498db; border-radius: 5px; box-sizing: border-box; cursor: pointer; text-decoration: none; font-size: 14px; font-weight: bold; margin: 0; padding: 12px 25px; text-transform: capitalize; border-color: #3498db;'>Call To Action</a> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> <p style='font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px;'>This is a really simple email template. Its sole purpose is to get the recipient to click the button with no distractions.</p> <p style='font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px;'>Good luck! Hope it works.</p> </td> </tr> </table> </td> </tr> </table> <div class='footer' style='clear: both; Margin-top: 10px; text-align: center; width: 100%;'> <table border='0' cellpadding='0' cellspacing='0' style='border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;'> <tr> <td class='content-block' style='font-family: sans-serif; vertical-align: top; padding-bottom: 10px; padding-top: 10px; font-size: 12px; color: #999999; text-align: center;'> <span class='apple-link' style='color: #999999; font-size: 12px; text-align: center;'>Company Inc, 3 Abbey Road, San Francisco CA 94102</span> <br> Don't like these emails? <a href='http://i.imgur.com/CScmqnj.gif' style='text-decoration: underline; color: #999999; font-size: 12px; text-align: center;'>Unsubscribe</a>. </td> </tr> <tr> <td class='content-block powered-by' style='font-family: sans-serif; vertical-align: top; padding-bottom: 10px; padding-top: 10px; font-size: 12px; color: #999999; text-align: center;'> Powered by <a href='http://htmlemail.io' style='color: #999999; font-size: 12px; text-align: center; text-decoration: none;'>HTMLemail</a>. </td> </tr> </table> </div> </div> </td> <td style='font-family: sans-serif; font-size: 14px; vertical-align: top;'> </td> </tr> </table> </body> </html>"
      // }

      const msg = {
        to: destinationEmails,
        from: `${senderName} <${senderMail}>`, // Use the email address or domain you verified above
        subject,
        text,
        html,
      };

      sgMail
        .sendMultiple(msg)
        .then((response) => {
          //   {
          //     "response": [
          //         {
          //             "statusCode": 202,
          //             "body": "",
          //             "headers": {
          //                 "server": "nginx",
          //                 "date": "Sat, 28 Aug 2021 04:44:20 GMT",
          //                 "content-length": "0",
          //                 "connection": "close",
          //                 "x-message-id": "3VYoL44lTjqgPyoRlSvFrQ",
          //                 "access-control-allow-origin": "https://sendgrid.api-docs.io",
          //                 "access-control-allow-methods": "POST",
          //                 "access-control-allow-headers": "Authorization, Content-Type, On-behalf-of, x-sg-elas-acl",
          //                 "access-control-max-age": "600",
          //                 "x-no-cors-reason": "https://sendgrid.com/docs/Classroom/Basics/API/cors.html",
          //                 "strict-transport-security": "max-age=600; includeSubDomains"
          //             }
          //         },
          //         ""
          //     ]
          // }

          return res.json({ response });
        })
        .catch((error) => {
          console.log(error.response.body.errors);
        });
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}

module.exports = EmailController;
