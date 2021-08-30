const Feed = require("../models/feeds");
const Kozii = require("../models/kozii");
const Merchant = require("../models/merchant");
const Mitra = require("../models/mitra");

class FeedControllers {
  static async get(req, res) {
    try {
      const feeds = await Feed.find({});

      return res.json({ feeds });
    } catch (error) {
      //   {
      //     "feeds": [
      //         {
      //             "audience": "VISITOR_ONLY",
      //             "ImageUrl": "this is image url",
      //             "tags": "SPECIAL",
      //             "ownerTypes": "KOZII",
      //             "_id": "612c89692df3fa3c1022e41c",
      //             "title": "this is title",
      //             "content": "this is content",
      //             "ownerId": "612c87ab4287a84494d44c15",
      //             "__v": 0
      //         },
      //         {
      //             "audience": "VISITOR_ONLY",
      //             "ImageUrl": "this is image url",
      //             "tags": "SPECIAL",
      //             "ownerTypes": "KOZII",
      //             "_id": "612c89bc2df3fa3c1022e41f",
      //             "title": "this is title",
      //             "content": "this is content",
      //             "ownerId": "612c87ab4287a84494d44c15",
      //             "__v": 0
      //         },
      //         {
      //             "audience": "VISITOR_ONLY",
      //             "ImageUrl": "this is image url",
      //             "tags": "SPECIAL",
      //             "ownerTypes": "KOZII",
      //             "_id": "612c89e22df3fa3c1022e424",
      //             "title": "this is title",
      //             "content": "this is content",
      //             "ownerId": "612c89d72df3fa3c1022e422",
      //             "__v": 0
      //         },
      //         {
      //             "audience": null,
      //             "ImageUrl": null,
      //             "tags": null,
      //             "ownerTypes": "MERCHANT",
      //             "_id": "612c92ed2175ae46b0d45daf",
      //             "title": "this is title update",
      //             "content": "this is content update",
      //             "ownerId": "612c909570c1d43dd4a15b16",
      //             "__v": 0
      //         }
      //     ]
      // }

      return res.status(500).json(error.message);
    }
  }
  static async getById(req, res) {
    try {
      const { id } = req.params;

      // id = 612c9b6164cbe717bc6de7b6

      const feed = await Feed.findById(id);

      if (!feed) {
        throw new Error("Feed not found");
      }

      return res.json(feed);
    } catch (error) {
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

      return res.status(500).json(error.message);
    }
  }
  static async create(req, res) {
    try {
      const { audience, title, content, ImageUrl, tags, ownerId } =
        await req.body;

      //   {
      //     "title":"this is title",
      //     "content":"this is content",
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
        throw new Error("Your account does not allowed to create feed");
      }

      const newFeed = await new Feed({
        audience,
        title,
        content,
        ImageUrl,
        tags,
        ownerTypes: type,
        ownerId,
      });

      await newFeed.save();

      //   {
      //     "audience": "VISITOR_ONLY",
      //     "ImageUrl": "this is image url",
      //     "tags": "SPECIAL",
      //     "ownerTypes": "MERCHANT",
      //     "_id": "612c92ed2175ae46b0d45daf",
      //     "title": "this is title",
      //     "content": "this is content",
      //     "ownerId": "612c909570c1d43dd4a15b16",
      //     "__v": 0
      // }

      return res.json(newFeed);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
  static async update(req, res) {
    try {
      const { audience, title, content, ImageUrl, tags, ownerId, feedId } =
        await req.body;

      //   {
      //     "title":"this is title update",
      //     "content":"this is content update",
      //     "ownerId":"612c909570c1d43dd4a15b16",
      //     "feedId":"612c92ed2175ae46b0d45daf"
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
        throw new Error("Your account does not allowed to update feed");
      }

      const updated = await Feed.updateOne(
        { _id: feedId },
        {
          audience,
          title,
          content,
          ImageUrl,
          tags,
          ownerTypes: type,
          ownerId,
        }
      ).catch((error) => {
        throw new Error("Error while update feed");
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
      const { ownerId, feedId } = await req.body;

      //   {
      //     "ownerId":"612c909570c1d43dd4a15b16",
      //     "feedId":"612c9584291add0eb0e7437a"
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
        throw new Error("Your account does not allowed to delete feed");
      }

      const deleted = await Feed.deleteOne({ _id: feedId });

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

module.exports = FeedControllers;
