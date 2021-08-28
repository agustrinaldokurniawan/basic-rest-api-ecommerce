const sgMail = require("@sendgrid/mail");
const { default: axios } = require("axios");
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
  static async listDesign(req, res) {
    try {
      axios({
        method: "get",
        url: "https://api.sendgrid.com/v3/designs",
        headers: {
          Authorization: `Bearer ${process.env.SENDGRID_API_KEY}`,
        },
      })
        .then((response) => {
          //   {
          //     "response": {
          //         "result": [
          //             {
          //                 "id": "bee460dc-9644-4054-82ec-aecd76fdeef5",
          //                 "name": "Duplicate: Retail Free Product Trial",
          //                 "generate_plain_content": true,
          //                 "thumbnail_url": "//us-east-2-production-thumbnail-bucket.s3.amazonaws.com/bbb1c299419aaa28a9723e3a9828b48b9a9f76ea34c863c6cdea8889338c9311.png",
          //                 "subject": "Get a free protein drink!",
          //                 "created_at": "2021-08-28T05:09:30Z",
          //                 "updated_at": "2021-08-28T05:45:42Z",
          //                 "editor": "code",
          //                 "categories": [
          //                     "Promotional",
          //                     "Retail"
          //                 ]
          //             },
          //             {
          //                 "id": "c89b156b-480e-482b-b320-7404573ae446",
          //                 "name": "Your Design",
          //                 "generate_plain_content": true,
          //                 "thumbnail_url": "//us-east-2-production-thumbnail-bucket.s3.amazonaws.com/fb88081f804bbaf9b1605fbd1c0cf940a4929b7a08f4c4bc7d3b113a63b1b362.png",
          //                 "subject": "",
          //                 "created_at": "2021-08-28T05:08:51Z",
          //                 "updated_at": "2021-08-28T05:22:32Z",
          //                 "editor": "design",
          //                 "categories": []
          //             }
          //         ],
          //         "_metadata": {
          //             "self": "https://api.sendgrid.com/v3/designs?page_token=qq-bwCi_G-QlGYmdDLPYjxNRFmrpblkivH1bcBdETu8A7wu0",
          //             "count": 2
          //         }
          //     }
          // }

          return res.json({ response: response.data });
        })
        .catch((error) => {
          console.log(error);
          throw new Error("Error while get designs");
        });
    } catch (error) {
      return res.status(500).json(error);
    }
  }
  static async getDesign(req, res) {
    try {
      const { id } = req.params;

      // id = bee460dc-9644-4054-82ec-aecd76fdeef5

      const resp = await axios({
        method: "get",
        url: `https://api.sendgrid.com/v3/designs/${id}`,
        headers: {
          Authorization: `Bearer ${process.env.SENDGRID_API_KEY}`,
        },
      }).catch((error) => {
        console.log(error);
        throw new Error("Error while get designs");
      });

      //   {
      //     "response": {
      //         "id": "bee460dc-9644-4054-82ec-aecd76fdeef5",
      //         "name": "Duplicate: Retail Free Product Trial",
      //         "html_content": "<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Strict//EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd\">\n<html data-editor-version=\"2\" class=\"sg-campaigns\" xmlns=\"http://www.w3.org/1999/xhtml\">\n    <head>\n      <meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\">\n      <meta name=\"viewport\" content=\"width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1\">\n      <!--[if !mso]><!-->\n      <meta http-equiv=\"X-UA-Compatible\" content=\"IE=Edge\">\n      <!--<![endif]-->\n      <!--[if (gte mso 9)|(IE)]>\n      <xml>\n        <o:OfficeDocumentSettings>\n          <o:AllowPNG/>\n          <o:PixelsPerInch>96</o:PixelsPerInch>\n        </o:OfficeDocumentSettings>\n      </xml>\n      <![endif]-->\n      <!--[if (gte mso 9)|(IE)]>\n  <style type=\"text/css\">\n    body {width: 700px;margin: 0 auto;}\n    table {border-collapse: collapse;}\n    table, td {mso-table-lspace: 0pt;mso-table-rspace: 0pt;}\n    img {-ms-interpolation-mode: bicubic;}\n  </style>\n<![endif]-->\n      <style type=\"text/css\">\n    body, p, div {\n      font-family: trebuchet ms,helvetica,sans-serif;\n      font-size: 16px;\n    }\n    body {\n      color: #B9762F;\n    }\n    body a {\n      color: #1188E6;\n      text-decoration: none;\n    }\n    p { margin: 0; padding: 0; }\n    table.wrapper {\n      width:100% !important;\n      table-layout: fixed;\n      -webkit-font-smoothing: antialiased;\n      -webkit-text-size-adjust: 100%;\n      -moz-text-size-adjust: 100%;\n      -ms-text-size-adjust: 100%;\n    }\n    img.max-width {\n      max-width: 100% !important;\n    }\n    .column.of-2 {\n      width: 50%;\n    }\n    .column.of-3 {\n      width: 33.333%;\n    }\n    .column.of-4 {\n      width: 25%;\n    }\n    ul ul ul ul  {\n      list-style-type: disc !important;\n    }\n    ol ol {\n      list-style-type: lower-roman !important;\n    }\n    ol ol ol {\n      list-style-type: lower-latin !important;\n    }\n    ol ol ol ol {\n      list-style-type: decimal !important;\n    }\n    @media screen and (max-width:480px) {\n      .preheader .rightColumnContent,\n      .footer .rightColumnContent {\n        text-align: left !important;\n      }\n      .preheader .rightColumnContent div,\n      .preheader .rightColumnContent span,\n      .footer .rightColumnContent div,\n      .footer .rightColumnContent span {\n        text-align: left !important;\n      }\n      .preheader .rightColumnContent,\n      .preheader .leftColumnContent {\n        font-size: 80% !important;\n        padding: 5px 0;\n      }\n      table.wrapper-mobile {\n        width: 100% !important;\n        table-layout: fixed;\n      }\n      img.max-width {\n        height: auto !important;\n        max-width: 100% !important;\n      }\n      a.bulletproof-button {\n        display: block !important;\n        width: auto !important;\n        font-size: 80%;\n        padding-left: 0 !important;\n        padding-right: 0 !important;\n      }\n      .columns {\n        width: 100% !important;\n      }\n      .column {\n        display: block !important;\n        width: 100% !important;\n        padding-left: 0 !important;\n        padding-right: 0 !important;\n        margin-left: 0 !important;\n        margin-right: 0 !important;\n      }\n      .social-icon-column {\n        display: inline-block !important;\n      }\n    }\n  </style>\n      <!--user entered Head Start--><!--End Head user entered-->\n    </head>\n    <body>\n      <center class=\"wrapper\" data-link-color=\"#1188E6\" data-body-style=\"font-size:16px; font-family:trebuchet ms,helvetica,sans-serif; color:#B9762F; background-color:#FFFFFF;\">\n        <div class=\"webkit\">\n          <table cellpadding=\"0\" cellspacing=\"0\" border=\"0\" width=\"100%\" class=\"wrapper\" bgcolor=\"#FFFFFF\">\n            <tr>\n              <td valign=\"top\" bgcolor=\"#FFFFFF\" width=\"100%\">\n                <table width=\"100%\" role=\"content-container\" class=\"outer\" align=\"center\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\">\n                  <tr>\n                    <td width=\"100%\">\n                      <table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\">\n                        <tr>\n                          <td>\n                            <!--[if mso]>\n    <center>\n    <table><tr><td width=\"700\">\n  <![endif]-->\n                                    <table width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"width:100%; max-width:700px;\" align=\"center\">\n                                      <tr>\n                                        <td role=\"modules-container\" style=\"padding:0px 0px 0px 0px; color:#B9762F; text-align:left;\" bgcolor=\"#FFFFFF\" width=\"100%\" align=\"left\"><table class=\"module preheader preheader-hide\" role=\"module\" data-type=\"preheader\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" style=\"display: none !important; mso-hide: all; visibility: hidden; opacity: 0; color: transparent; height: 0; width: 0;\">\n    <tr>\n      <td role=\"module-content\">\n        <p></p>\n      </td>\n    </tr>\n  </table><table class=\"module\" role=\"module\" data-type=\"text\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" style=\"table-layout: fixed;\" data-muid=\"1b9b7db8-c2f5-4943-bbe4-7cc9bfef45ad\" data-mc-module-version=\"2019-10-22\">\n    <tbody>\n      <tr>\n        <td style=\"padding:15px 0px 10px 100px; line-height:12px; text-align:inherit;\" height=\"100%\" valign=\"top\" bgcolor=\"\" role=\"module-content\"><div><div style=\"font-family: inherit; text-align: right\"><span style=\"font-size: 10px; color: #000000\">Email not displaying correctly? </span><span style=\"font-size: 10px; color: #b9762f\"><strong>VIEW IT</strong></span><span style=\"font-size: 10px; color: #000000\"> in your browser.</span></div><div></div></div></td>\n      </tr>\n    </tbody>\n  </table><table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" width=\"100%\" role=\"module\" data-type=\"columns\" style=\"padding:30px 60px 12px 60px;\" bgcolor=\"#B9762F\" data-distribution=\"1\">\n    <tbody>\n      <tr role=\"module-content\">\n        <td height=\"100%\" valign=\"top\"><table width=\"200\" style=\"width:200px; border-spacing:0; border-collapse:collapse; margin:0px 190px 0px 190px;\" cellpadding=\"0\" cellspacing=\"0\" align=\"left\" border=\"0\" bgcolor=\"\" class=\"column column-0\">\n      <tbody>\n        <tr>\n          <td style=\"padding:0px;margin:0px;border-spacing:0;\"><table class=\"wrapper\" role=\"module\" data-type=\"image\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" style=\"table-layout: fixed;\" data-muid=\"069ade7e-6b71-4c21-8a34-a4bf8393e70d\">\n    <tbody>\n      <tr>\n        <td style=\"font-size:6px; line-height:10px; padding:0px 0px 0px 0px;\" valign=\"top\" align=\"center\">\n          <img class=\"max-width\" border=\"0\" style=\"display:block; color:#000000; text-decoration:none; font-family:Helvetica, arial, sans-serif; font-size:16px; max-width:100% !important; width:100%; height:auto !important;\" width=\"200\" alt=\"\" data-proportionally-constrained=\"true\" data-responsive=\"true\" src=\"http://cdn.mcauto-images-production.sendgrid.net/c31721ac5f4f8b45/7ac8c302-b154-4e30-9541-007bdf0cb0f1/619x128.png\">\n        </td>\n      </tr>\n    </tbody>\n  </table></td>\n        </tr>\n      </tbody>\n    </table></td>\n      </tr>\n    </tbody>\n  </table><table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" width=\"100%\" role=\"module\" data-type=\"columns\" style=\"padding:0px 0px 15px 0px;\" bgcolor=\"#B9762F\" data-distribution=\"1\">\n    <tbody>\n      <tr role=\"module-content\">\n        <td height=\"100%\" valign=\"top\"><table width=\"260\" style=\"width:260px; border-spacing:0; border-collapse:collapse; margin:0px 220px 0px 220px;\" cellpadding=\"0\" cellspacing=\"0\" align=\"left\" border=\"0\" bgcolor=\"\" class=\"column column-0\">\n      <tbody>\n        <tr>\n          <td style=\"padding:0px;margin:0px;border-spacing:0;\"><table class=\"module\" role=\"module\" data-type=\"text\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" style=\"table-layout: fixed;\" data-muid=\"15af8a9f-5f04-4626-8ad0-42f3daf8cad1.1\" data-mc-module-version=\"2019-10-22\">\n    <tbody>\n      <tr>\n        <td style=\"padding:0px 0px 0px 0px; line-height:22px; text-align:inherit;\" height=\"100%\" valign=\"top\" bgcolor=\"\" role=\"module-content\"><div><div style=\"font-family: inherit; text-align: center\"><span style=\"color: #fae2a4; font-size: 14px\">The protein drink that tastes like milk</span></div><div></div></div></td>\n      </tr>\n    </tbody>\n  </table></td>\n        </tr>\n      </tbody>\n    </table></td>\n      </tr>\n    </tbody>\n  </table><table class=\"wrapper\" role=\"module\" data-type=\"image\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" style=\"table-layout: fixed;\" data-muid=\"1907ce09-be93-4607-a9e3-b697ca9e82f8\">\n    <tbody>\n      <tr>\n        <td style=\"font-size:6px; line-height:10px; padding:0px 0px 0px 0px;\" valign=\"top\" align=\"center\">\n          <img class=\"max-width\" border=\"0\" style=\"display:block; color:#000000; text-decoration:none; font-family:Helvetica, arial, sans-serif; font-size:16px; max-width:100% !important; width:100%; height:auto !important;\" width=\"700\" alt=\"\" data-proportionally-constrained=\"true\" data-responsive=\"true\" src=\"http://cdn.mcauto-images-production.sendgrid.net/c31721ac5f4f8b45/f65126c2-eae2-4327-a5d3-d9503eafa295/2635x1580.jpg\">\n        </td>\n      </tr>\n    </tbody>\n  </table><table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" align=\"center\" width=\"100%\" role=\"module\" data-type=\"columns\" style=\"padding:50px 10px 70px 10px;\" bgcolor=\"#FAE2A4\" data-distribution=\"1\">\n    <tbody>\n      <tr role=\"module-content\">\n        <td height=\"100%\" valign=\"top\"><table width=\"460\" style=\"width:460px; border-spacing:0; border-collapse:collapse; margin:0px 110px 0px 110px;\" cellpadding=\"0\" cellspacing=\"0\" align=\"left\" border=\"0\" bgcolor=\"\" class=\"column column-0\">\n      <tbody>\n        <tr>\n          <td style=\"padding:0px;margin:0px;border-spacing:0;\"><table class=\"module\" role=\"module\" data-type=\"text\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" style=\"table-layout: fixed;\" data-muid=\"0a015936-50f3-44d1-be17-b08b49b1e339.2\" data-mc-module-version=\"2019-10-22\">\n    <tbody>\n      <tr>\n        <td style=\"padding:0px 0px 5px 0px; line-height:25px; text-align:inherit;\" height=\"100%\" valign=\"top\" bgcolor=\"\" role=\"module-content\"><div><div style=\"font-family: inherit; text-align: center\"><span style=\"color: #000000; font-size: 25px\"><strong>Try the</strong></span></div><div></div></div></td>\n      </tr>\n    </tbody>\n  </table><table class=\"module\" role=\"module\" data-type=\"text\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" style=\"table-layout: fixed;\" data-muid=\"0a015936-50f3-44d1-be17-b08b49b1e339.1\" data-mc-module-version=\"2019-10-22\">\n    <tbody>\n      <tr>\n        <td style=\"padding:0px 0px 0px 0px; line-height:30px; text-align:inherit;\" height=\"100%\" valign=\"top\" bgcolor=\"\" role=\"module-content\"><div><div style=\"font-family: inherit; text-align: center\"><span style=\"color: #000000; font-size: 40px\"><strong>SANDY PROTEIN</strong></span></div><div></div></div></td>\n      </tr>\n    </tbody>\n  </table><table class=\"module\" role=\"module\" data-type=\"text\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" style=\"table-layout: fixed;\" data-muid=\"0a015936-50f3-44d1-be17-b08b49b1e339\" data-mc-module-version=\"2019-10-22\">\n    <tbody>\n      <tr>\n        <td style=\"padding:0px 0px 0px 0px; line-height:25px; text-align:inherit;\" height=\"100%\" valign=\"top\" bgcolor=\"\" role=\"module-content\"><div><div style=\"font-family: inherit; text-align: center\"><span style=\"color: #000000; font-size: 25px\"><strong>for free!</strong></span></div><div></div></div></td>\n      </tr>\n    </tbody>\n  </table><table class=\"module\" role=\"module\" data-type=\"text\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" style=\"table-layout: fixed;\" data-muid=\"0a015936-50f3-44d1-be17-b08b49b1e339.3\" data-mc-module-version=\"2019-10-22\">\n    <tbody>\n      <tr>\n        <td style=\"padding:15px 0px 0px 0px; line-height:20px; text-align:inherit;\" height=\"100%\" valign=\"top\" bgcolor=\"\" role=\"module-content\"><div><div style=\"font-family: inherit; text-align: center\"><span style=\"font-size: 16px; color: #b9762f\">You shouldn't have to pinch your nose to swallow your protein drink. That's why we designed Sandy Protein with a well-balanced natural flavor combination—to delight your body </span><span style=\"font-size: 16px; color: #b9762f\"><em>and</em></span><span style=\"font-size: 16px; color: #b9762f\"> your tastebuds.</span></div><div></div></div></td>\n      </tr>\n    </tbody>\n  </table><table class=\"wrapper\" role=\"module\" data-type=\"image\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" style=\"table-layout: fixed;\" data-muid=\"20cecf03-0bd9-4440-a176-0a80a7b03d9f\">\n    <tbody>\n      <tr>\n        <td style=\"font-size:6px; line-height:10px; padding:50px 0px 50px 0px;\" valign=\"top\" align=\"center\">\n          <img class=\"max-width\" border=\"0\" style=\"display:block; color:#000000; text-decoration:none; font-family:Helvetica, arial, sans-serif; font-size:16px; max-width:100% !important; width:100%; height:auto !important;\" width=\"NaN\" alt=\"\" data-proportionally-constrained=\"true\" data-responsive=\"true\" src=\"http://cdn.mcauto-images-production.sendgrid.net/c31721ac5f4f8b45/da6cd325-de0a-4aae-86cf-0fc6a2494667/1856x302.jpg\">\n        </td>\n      </tr>\n    </tbody>\n  </table><table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" class=\"module\" data-role=\"module-button\" data-type=\"button\" role=\"module\" style=\"table-layout:fixed;\" width=\"100%\" data-muid=\"225a8e2b-940c-417b-b512-b29980d8babf\">\n      <tbody>\n        <tr>\n          <td align=\"center\" bgcolor=\"\" class=\"outer-td\" style=\"padding:0px 0px 0px 0px;\">\n            <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" class=\"wrapper-mobile\" style=\"text-align:center;\">\n              <tbody>\n                <tr>\n                <td align=\"center\" bgcolor=\"#FAE2A4\" class=\"inner-td\" style=\"border-radius:6px; font-size:16px; text-align:center; background-color:inherit;\">\n                  <a href=\"https://www.google.com/intl/id/photos/about/\" style=\"background-color:#FAE2A4; border:1px solid #B9762F; border-color:#B9762F; border-radius:100px; border-width:1px; color:#000000; display:inline-block; font-size:14px; font-weight:bold; letter-spacing:0px; line-height:normal; padding:18px 80px 18px 80px; text-align:center; text-decoration:none; border-style:solid;\" target=\"_blank\">TRY IT NOW!</a>\n                </td>\n                </tr>\n              </tbody>\n            </table>\n          </td>\n        </tr>\n      </tbody>\n    </table></td>\n        </tr>\n      </tbody>\n    </table></td>\n      </tr>\n    </tbody>\n  </table><table class=\"module\" role=\"module\" data-type=\"social\" align=\"center\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" style=\"table-layout: fixed;\" data-muid=\"7be36129-3e47-487e-9713-24fa804388ad\">\n    <tbody>\n      <tr>\n        <td valign=\"top\" style=\"padding:40px 0px 0px 0px; font-size:6px; line-height:10px;\" align=\"center\">\n          <table align=\"center\" style=\"-webkit-margin-start:auto;-webkit-margin-end:auto;\">\n            <tbody><tr align=\"center\"><td style=\"padding: 0px 5px;\" class=\"social-icon-column\">\n      <a role=\"social-icon-link\" href=\"https://www.facebook.com/sendgrid/\" target=\"_blank\" alt=\"Facebook\" title=\"Facebook\" style=\"display:inline-block; background-color:#000000; height:22px; width:22px;\">\n        <img role=\"social-icon\" alt=\"Facebook\" title=\"Facebook\" src=\"https://mc.sendgrid.com/assets/social/white/facebook.png\" style=\"height:22px; width:22px;\" height=\"22\" width=\"22\">\n      </a>\n    </td><td style=\"padding: 0px 5px;\" class=\"social-icon-column\">\n      <a role=\"social-icon-link\" href=\"https://twitter.com/sendgrid\" target=\"_blank\" alt=\"Twitter\" title=\"Twitter\" style=\"display:inline-block; background-color:#000000; height:22px; width:22px;\">\n        <img role=\"social-icon\" alt=\"Twitter\" title=\"Twitter\" src=\"https://mc.sendgrid.com/assets/social/white/twitter.png\" style=\"height:22px; width:22px;\" height=\"22\" width=\"22\">\n      </a>\n    </td><td style=\"padding: 0px 5px;\" class=\"social-icon-column\">\n      <a role=\"social-icon-link\" href=\"https://www.instagram.com/sendgrid/\" target=\"_blank\" alt=\"Instagram\" title=\"Instagram\" style=\"display:inline-block; background-color:#000000; height:22px; width:22px;\">\n        <img role=\"social-icon\" alt=\"Instagram\" title=\"Instagram\" src=\"https://mc.sendgrid.com/assets/social/white/instagram.png\" style=\"height:22px; width:22px;\" height=\"22\" width=\"22\">\n      </a>\n    </td><td style=\"padding: 0px 5px;\" class=\"social-icon-column\">\n      <a role=\"social-icon-link\" href=\"https://www.pinterest.com/sendgrid/\" target=\"_blank\" alt=\"Pinterest\" title=\"Pinterest\" style=\"display:inline-block; background-color:#000000; height:22px; width:22px;\">\n        <img role=\"social-icon\" alt=\"Pinterest\" title=\"Pinterest\" src=\"https://mc.sendgrid.com/assets/social/white/pinterest.png\" style=\"height:22px; width:22px;\" height=\"22\" width=\"22\">\n      </a>\n    </td><td style=\"padding: 0px 5px;\" class=\"social-icon-column\">\n      <a role=\"social-icon-link\" href=\"https://www.linkedin.com/company/sendgrid/\" target=\"_blank\" alt=\"LinkedIn\" title=\"LinkedIn\" style=\"display:inline-block; background-color:#000000; height:22px; width:22px;\">\n        <img role=\"social-icon\" alt=\"LinkedIn\" title=\"LinkedIn\" src=\"https://mc.sendgrid.com/assets/social/white/linkedin.png\" style=\"height:22px; width:22px;\" height=\"22\" width=\"22\">\n      </a>\n    </td></tr></tbody>\n          </table>\n        </td>\n      </tr>\n    </tbody>\n  </table><div data-role=\"module-unsubscribe\" class=\"module\" role=\"module\" data-type=\"unsubscribe\" style=\"color:#000000; font-size:12px; line-height:20px; padding:16px 16px 16px 16px; text-align:Center;\" data-muid=\"4e838cf3-9892-4a6d-94d6-170e474d21e5\"><div class=\"Unsubscribe--addressLine\"><p class=\"Unsubscribe--senderName\" style=\"font-size:12px; line-height:20px;\">{{Sender_Name}}</p><p style=\"font-size:12px; line-height:20px;\"><span class=\"Unsubscribe--senderAddress\">{{Sender_Address}}</span>, <span class=\"Unsubscribe--senderCity\">{{Sender_City}}</span>, <span class=\"Unsubscribe--senderState\">{{Sender_State}}</span> <span class=\"Unsubscribe--senderZip\">{{Sender_Zip}}</span></p></div><p style=\"font-size:12px; line-height:20px;\"><a class=\"Unsubscribe--unsubscribeLink\" href=\"{{{unsubscribe}}}\" target=\"_blank\" style=\"color:#B9762F;\">Unsubscribe</a></p></div><table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" class=\"module\" data-role=\"module-button\" data-type=\"button\" role=\"module\" style=\"table-layout:fixed;\" width=\"100%\" data-muid=\"e008f292-388f-481e-af50-167360fb0da3\">\n      <tbody>\n        <tr>\n          <td align=\"center\" bgcolor=\"\" class=\"outer-td\" style=\"padding:20px 0px 20px 0px;\">\n            <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" class=\"wrapper-mobile\" style=\"text-align:center;\">\n              <tbody>\n                <tr>\n                <td align=\"center\" bgcolor=\"#F5F8FD\" class=\"inner-td\" style=\"border-radius:6px; font-size:16px; text-align:center; background-color:inherit;\">\n                  <a href=\"https://sendgrid.com/\" style=\"background-color:#F5F8FD; border:1px solid #F5F8FD; border-color:#F5F8FD; border-radius:25px; border-width:1px; color:#A8B9D5; display:inline-block; font-size:10px; font-weight:normal; letter-spacing:0px; line-height:normal; padding:5px 18px 5px 18px; text-align:center; text-decoration:none; border-style:solid; font-family:helvetica,sans-serif;\" target=\"_blank\">♥ POWERED BY TWILIO SENDGRID</a>\n                </td>\n                </tr>\n              </tbody>\n            </table>\n          </td>\n        </tr>\n      </tbody>\n    </table></td>\n                                      </tr>\n                                    </table>\n                                    <!--[if mso]>\n                                  </td>\n                                </tr>\n                              </table>\n                            </center>\n                            <![endif]-->\n                          </td>\n                        </tr>\n                      </table>\n                    </td>\n                  </tr>\n                </table>\n              </td>\n            </tr>\n          </table>\n        </div>\n      </center>\n    </body>\n  </html>",
      //         "plain_content": "Email not displaying correctly? *VIEW IT* in your browser.\n\nThe protein drink that tastes like milk\n\n*Try the*\n\n*SANDY PROTEIN*\n\n*for free!*\n\nYou shouldn't have to pinch your nose to swallow your protein drink. That's why we designed Sandy Protein with a well-balanced natural flavor combination—to delight your body and your tastebuds.\n\nTRY IT NOW! ( https://www.google.com/intl/id/photos/about/ )\n\n( https://www.facebook.com/sendgrid/ ) ( https://twitter.com/sendgrid ) ( https://www.instagram.com/sendgrid/ ) ( https://www.pinterest.com/sendgrid/ ) ( https://www.linkedin.com/company/sendgrid/ )\n\n{{Sender_Name}}\n\n{{Sender_Address}} , {{Sender_City}} , {{Sender_State}} {{Sender_Zip}}\n\nUnsubscribe ( {{{unsubscribe}}} )\n\n♥ POWERED BY TWILIO SENDGRID ( https://sendgrid.com/ )",
      //         "generate_plain_content": true,
      //         "thumbnail_url": "//us-east-2-production-thumbnail-bucket.s3.amazonaws.com/bbb1c299419aaa28a9723e3a9828b48b9a9f76ea34c863c6cdea8889338c9311.png",
      //         "subject": "Get a free protein drink!",
      //         "created_at": "2021-08-28T05:09:30Z",
      //         "updated_at": "2021-08-28T05:45:42Z",
      //         "editor": "code",
      //         "categories": [
      //             "Promotional",
      //             "Retail"
      //         ]
      //     }
      // }

      return res.json({ response: resp.data });
    } catch (error) {
      return res.status(500).json(error);
    }
  }
  static async sendMailByDesign(req, res) {
    try {
      const { destinationEmails, senderMail, senderName, designId } = req.body;

      //   {
      //     "destinationEmails":["agustkurniawan010899@gmail.com", "agustrinaldokurniawan@gmail.com"],
      //     "senderMail":"no-reply@kozii.id",
      //     "senderName":"Kurniawan",
      //     "designId":"bee460dc-9644-4054-82ec-aecd76fdeef5"
      // }

      if (!designId) {
        throw new Error("Design Id is required");
      }

      const design = await axios({
        method: "get",
        url: `https://api.sendgrid.com/v3/designs/${designId}`,
        headers: {
          Authorization: `Bearer ${process.env.SENDGRID_API_KEY}`,
        },
      }).catch((error) => {
        console.log(error);
        throw new Error("Error while get designs");
      });

      if (!design) {
        throw new Error("Design not found");
      }

      const msg = {
        to: destinationEmails,
        from: `${senderName} <${senderMail}>`, // Use the email address or domain you verified above
        subject: design.data.subject,
        text: "Not supported just by text",
        html: design.data.html_content,
      };

      sgMail.sendMultiple(msg).then((response) => {
        //   {
        //     "response": [
        //         {
        //             "statusCode": 202,
        //             "body": "",
        //             "headers": {
        //                 "server": "nginx",
        //                 "date": "Sat, 28 Aug 2021 06:03:54 GMT",
        //                 "content-length": "0",
        //                 "connection": "close",
        //                 "x-message-id": "U28mw8nIQOy-R4V6hjbaIQ",
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
      });
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}

module.exports = EmailController;
