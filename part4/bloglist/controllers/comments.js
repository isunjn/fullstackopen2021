const commentRouter = require("express").Router();
const Comment = require("../models/comment");
const Blog = require("../models/blog");
const mongoose = require("mongoose");


commentRouter.get("/", async (req, res) => {
  const comments = await Comment.find({});
  res.json(comments);
});

commentRouter.get("/:blogid", async (req, res) => {
  const comments = await Comment.find({
    blogid: mongoose.Types.ObjectId(req.params.blogid),
  });
  res.json(comments);
});

commentRouter.post("/", async (req, res) => {
  const body = req.body;

  if (!body.content) {
    return res.status(400).json({ error: "Must have content" });
  }

  const blog = await Blog.findById(body.blogid);

  const comment = new Comment({
    content: body.content,
    blogid: blog._id,
  });

  console.log('comment structure: ', comment);

  const savedComment = await comment.save();
  res.status(201).json(savedComment);
});

module.exports = commentRouter;
