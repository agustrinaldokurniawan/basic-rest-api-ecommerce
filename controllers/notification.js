const Notification = require("../models/notification");
const Kozii = require("../models/kozii");
const Merchant = require("../models/merchant");
const Mitra = require("../models/mitra");

class NotificationControllers {
  static async get(req, res) {
    try {
      const notifications = await Notification.find({});

      //   {
      //     "notifications": [
      //         {
      //             "audience": "VISITOR_ONLY",
      //             "ImageUrl": "this is image url",
      //             "category": "SPECIAL",
      //             "ownerTypes": "MERCHANT",
      //             "_id": "612c9b6164cbe717bc6de7b6",
      //             "title": "this is title",
      //             "message": "this is message",
      //             "ownerId": "612c909570c1d43dd4a15b16",
      //             "__v": 0
      //         }
      //     ]
      // }

      return res.json({ notifications });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
  static async getById(req, res) {
    try {
      const { id } = req.params;

      //612c9b6164cbe717bc6de7b6

      const notification = await Notification.findById(id);

      if (!notification) {
        throw new Error("notification not found");
      }

      //   {
      //     "audience": "VISITOR_ONLY",
      //     "ImageUrl": "this is image url",
      //     "category": "SPECIAL",
      //     "ownerTypes": "MERCHANT",
      //     "_id": "612c9b6164cbe717bc6de7b6",
      //     "title": "this is title",
      //     "message": "this is message",
      //     "ownerId": "612c909570c1d43dd4a15b16",
      //     "__v": 0
      // }

      return res.json(notification);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
  static async create(req, res) {
    try {
      const { audience, title, message, ImageUrl, category, ownerId } =
        await req.body;

      // {
      //     "title":"this is title",
      //     "message":"this is message",
      //     "ImageUrl":"this is image url",
      //     "ownerId":"612c909570c1d43dd4a15b16"
      // }

      let owner;
      let type;

      let KOZII = await Kozii.exists({ _id: ownerId });
      let MERCHANT = await Merchant.exists({ _id: ownerId });
      let MITRA = await Mitra.exists({ _id: ownerId });

      if (KOZII) {
        type = "KOZII";
        owner = await Kozii.findById(ownerId);
      }
      if (MERCHANT) {
        type = "MERCHANT";
        owner = await Merchant.findById(ownerId);
      }
      if (MITRA) {
        type = "MITRA";
        owner = await Mitra.findById(ownerId);
      }

      if (!owner) {
        throw new Error("Your account does not allowed to create notification");
      }

      const newNotification = await new Notification({
        audience,
        title,
        message,
        ImageUrl,
        category,
        ownerTypes: type,
        ownerId,
      });

      await newNotification.save();

      //   {
      //     "audience": "VISITOR_ONLY",
      //     "ImageUrl": "this is image url",
      //     "category": "SPECIAL",
      //     "ownerTypes": "MERCHANT",
      //     "_id": "612c9af4f92ec42110503745",
      //     "title": "this is title",
      //     "message": "this is message",
      //     "ownerId": "612c909570c1d43dd4a15b16",
      //     "__v": 0
      // }

      return res.json(newNotification);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
  static async update(req, res) {
    try {
      const {
        audience,
        title,
        message,
        ImageUrl,
        category,
        ownerId,
        notificationId,
      } = await req.body;

      //   {
      //     "title":"this is title update",
      //     "message":"this is message update",
      //     "ownerId":"612c909570c1d43dd4a15b16",
      //     "notificationId":"612c9af4f92ec42110503745"
      // }

      let owner;
      let type;

      let KOZII = await Kozii.exists({ _id: ownerId });
      let MERCHANT = await Merchant.exists({ _id: ownerId });
      let MITRA = await Mitra.exists({ _id: ownerId });

      if (KOZII) {
        type = "KOZII";
        owner = await Kozii.findById(ownerId);
      }
      if (MERCHANT) {
        type = "MERCHANT";
        owner = await Merchant.findById(ownerId);
      }
      if (MITRA) {
        type = "MITRA";
        owner = await Mitra.findById(ownerId);
      }

      if (!owner) {
        throw new Error("Your account does not allowed to update notification");
      }

      const updated = await Notification.updateOne(
        { _id: notificationId },
        {
          audience,
          title,
          message,
          ImageUrl,
          category,
          ownerTypes: type,
          ownerId,
        }
      ).catch((error) => {
        throw new Error("Error while update notification");
      });

      //   {
      //     "n": 1,
      //     "nModified": 1,
      //     "ok": 1
      // }

      return res.json(updated);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
  static async delete(req, res) {
    try {
      const { ownerId, notificationId } = await req.body;

      //   {
      //     "ownerId":"612c909570c1d43dd4a15b16",
      //     "notificationId":"612c9af4f92ec42110503745"
      // }

      let owner;
      let type;

      let KOZII = await Kozii.exists({ _id: ownerId });
      let MERCHANT = await Merchant.exists({ _id: ownerId });
      let MITRA = await Mitra.exists({ _id: ownerId });

      if (KOZII) {
        type = "KOZII";
        owner = await Kozii.findById(ownerId);
      }
      if (MERCHANT) {
        type = "MERCHANT";
        owner = await Merchant.findById(ownerId);
      }
      if (MITRA) {
        type = "MITRA";
        owner = await Mitra.findById(ownerId);
      }

      if (!owner) {
        throw new Error("Your account does not allowed to delete notification");
      }

      const deleted = await Notification.deleteOne({ _id: notificationId });

      //   {
      //     "n": 1,
      //     "ok": 1,
      //     "deletedCount": 1
      // }

      return res.json(deleted);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
}

module.exports = NotificationControllers;
