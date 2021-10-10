const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const PostSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: { type: String, required: true },
    author: { type: String, required: true },
    likes: { type: Number, default: 0 },
});

module.exports = Posts = mongoose.model("posts", PostSchema, "posts");