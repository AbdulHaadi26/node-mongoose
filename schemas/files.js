const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const FileSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    type: { type: String, required: true },
    size: { type: Number, default: 0 },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
});

module.exports = Files = mongoose.model("files", FileSchema, "files");