const Validation = require("../helper/validation");
const Blog = require("../models/blog");
class BlogController {
  static async createBlog(req, res) {
    try {
      const { title, content } = await req.body;

      if (!title) {
        throw {
          message: "Title is needed",
          status: 400,
        };
      }

      if (!content) {
        throw {
          message: "Content is needed",
          status: 400,
        };
      }

      const newBlog = new Blog({
        title,
        content,
      });

      const savedBlog = await newBlog.save().catch((error) => {
        throw {
          message: "Something wrong while creating blog",
          error,
          status: 500,
        };
      });

      return res.json({ blog: savedBlog });
    } catch (error) {
      return res.status(error.status).json(error);
    }
  }

  static async getAllBlog(req, res) {
    try {
      const { skip, limit } = req.query;
      const blogs = await Blog.find({})
        .skip(parseInt(skip))
        .limit(parseInt(limit));

      if (blogs.length < 1) {
        throw {
          message: "Blog is empty",
          status: 404,
        };
      }

      return res.json({ blogs });
    } catch (error) {
      return res.status(error.status || 500).json(error);
    }
  }

  static async getBlogTitleByQuery(req, res) {
    try {
      const { keyword, skip, limit } = req.query;

      const blogs = await Blog.find({ title: { $regex: keyword } })
        .skip(parseInt(skip))
        .limit(parseInt(limit));

      if (blogs.length < 1) {
        throw {
          message: "Blog not found",
          status: 404,
        };
      }

      return res.json({ blogs });
    } catch (error) {
      return res.status(error.status).json(error);
    }
  }
}

module.exports = BlogController;
