const { default: axios } = require("axios");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const User = require("../models/user");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

class UserController {
  static async signup(req, res) {
    try {
      const { phoneNumber, email, password } = await req.body;

      const searchQueryByEmail = await { "loginInfo.email": email };

      const user = await User.findOne(searchQueryByEmail).lean();

      if (user) {
        throw {
          message: "Email already been registered",
        };
      }

      const hashedPassword = await bcrypt
        .hash(password, saltRounds)
        .catch((error) => {
          throw {
            error,
            message: "Error while hashing password",
          };
        });

      const userCoreInfo = await {
        phoneNumber,
      };

      const loginInfo = await {
        email,
        password: hashedPassword,
      };

      const newUser = await User.create({
        userCoreInfo,
        loginInfo,
      }).catch((error) => {
        throw { error, message: "Error while create new user to db" };
      });

      return res.json(newUser);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  static async signin(req, res) {
    try {
      const { email, password } = await req.body;

      const searchQueryByEmail = await { "loginInfo.email": email };

      const user = await User.findOne(searchQueryByEmail).lean();

      if (!user) {
        throw {
          message: "Accound not found",
        };
      }

      const registeredPassword = user.loginInfo.password;

      const passwordIsTrue = await bcrypt
        .compare(password, registeredPassword)
        .catch((err) => {
          throw {
            error,
            message: "Error while checking password",
          };
        });

      if (!passwordIsTrue) {
        throw {
          message: "Wrong password",
        };
      }

      return res.json(user);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  static async resetPassword(req, res) {
    try {
      const { email } = await req.body;

      //   {
      //     "email":"agustkurniawan010899@gmail.com"
      // }

      const searchQueryByEmail = await { "loginInfo.email": email };

      const user = await User.findOne(searchQueryByEmail).exec();

      if (!user) {
        throw {
          message: "User not found",
        };
      }

      const newPassword = await Date.now().toString();
      const hashedPassword = await bcrypt
        .hash(newPassword, saltRounds)
        .catch((error) => {
          throw { error, message: "Error while hashing password" };
        });

      user.loginInfo.password = await hashedPassword;
      await user.save().catch((error) => {
        throw {
          error,
          message: "Error while saving new password",
        };
      });

      const senderName = "Kozii";
      const senderMail = "no-reply@kozii.id";
      const templateResetPasswordId = "d-37d358642d594c0fab05a38bc9827e87";

      const msg = await {
        to: {
          email,
        },
        from: {
          email: senderMail,
          name: senderName,
        },
        templateId: templateResetPasswordId,
        dynamic_template_data: {
          email: email.toString(),
          password: newPassword,
        },
      };

      await sgMail
        .send(msg)
        .then((response) => {
          //   [
          //     {
          //         "statusCode": 202,
          //         "headers": {
          //             "server": "nginx",
          //             "date": "Wed, 01 Sep 2021 15:22:02 GMT",
          //             "content-length": "0",
          //             "connection": "close",
          //             "x-message-id": "6697MRVEQyykElM9hQ1byA",
          //             "access-control-allow-origin": "https://sendgrid.api-docs.io",
          //             "access-control-allow-methods": "POST",
          //             "access-control-allow-headers": "Authorization, Content-Type, On-behalf-of, x-sg-elas-acl",
          //             "access-control-max-age": "600",
          //             "x-no-cors-reason": "https://sendgrid.com/docs/Classroom/Basics/API/cors.html",
          //             "strict-transport-security": "max-age=600; includeSubDomains"
          //         },
          //         "request": {
          //             "uri": {
          //                 "protocol": "https:",
          //                 "slashes": true,
          //                 "auth": null,
          //                 "host": "api.sendgrid.com",
          //                 "port": 443,
          //                 "hostname": "api.sendgrid.com",
          //                 "hash": null,
          //                 "search": null,
          //                 "query": null,
          //                 "pathname": "/v3/mail/send",
          //                 "path": "/v3/mail/send",
          //                 "href": "https://api.sendgrid.com/v3/mail/send"
          //             },
          //             "method": "POST",
          //             "headers": {
          //                 "Accept": "application/json",
          //                 "User-agent": "sendgrid/6.5.5;nodejs",
          //                 "Authorization": "Bearer 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",
          //                 "content-type": "application/json",
          //                 "content-length": 271
          //             }
          //         }
          //     },
          //     null
          // ]
          return res.json(response);
        })
        .catch((error) => {
          console.log(error);
          throw {
            error,
            message: "Error while sending email",
          };
        });
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}

module.exports = UserController;
