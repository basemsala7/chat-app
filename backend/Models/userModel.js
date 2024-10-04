const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema(
  {
    name: { type: String, min: 3, max: 16, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, min: 8, max: 16, required: true },
  },
  { timestamps: true }
);
const userModle = mongoose.model("Users", usersSchema);
module.exports = userModle;
