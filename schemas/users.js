const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

// Create Schema
const UserSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    email: { type: String },
    mobile: { type: String, required: true },
    password: { type: String, required: true, minlength: 6 },
    date: {
        type: Date, default: new Date(Date.now())
    }, level: {
        type: Number, default: 1
    }
});

//Store Encrypted Password When Creating Account
UserSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) user.password = await bcrypt.hash(user.password, 10);
    next();
});

//Generate JWT Token
UserSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign({ _id: user._id }, "secret_salt", { expiresIn: '30d' });
    return token;
};


module.exports = Users = mongoose.model("users", UserSchema, "users");