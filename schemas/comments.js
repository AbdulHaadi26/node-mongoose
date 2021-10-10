const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const CommentSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    comment: { type: String, required: true },
    postTitle: { type: String, required: true },
    likes: { type: Number, default: 0 },
});

module.exports = Comments = mongoose.model("comments", CommentSchema, "comments");