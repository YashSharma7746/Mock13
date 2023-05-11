const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    email: String,
    password: String,
  },
  { versionKey: false }
);
const userModal = mongoose.model("User", userSchema);
module.exports = { userModal };
