const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const FolderSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    files: [{ type: mongoose.Schema.Types.ObjectId, ref: 'files' }],
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
});

module.exports = Folders = mongoose.model("folders", FolderSchema, "folders");