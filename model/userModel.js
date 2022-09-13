const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const userModelSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: String,
  },
  {
    timestamps: true,
  }
);
userModelSchema.pre("save", async function (next) {
  const hashPassword = await bcrypt.hash(this.password, 10);
  this.password = hashPassword;
  next();
});

const UserModel = mongoose.model("user", userModelSchema);

module.exports = UserModel;
