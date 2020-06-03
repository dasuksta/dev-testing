const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: { type: String, lowercase: true, trim: true },
    email: { type: String, lowercase: true, trim: true },
    password: { type: String, required: true },
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
      }
    ],
    created_on: { type: Date, default: Date.now() },
    last_login: { type: Date },
  })
);

module.exports = User;
