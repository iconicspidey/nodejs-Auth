const UserModel = require("../model/userModel");
const jwt = require("jsonwebtoken");
const secreteKey = "bab317fce676aac031f5a6dea46dab7e072c4826";
const bcrypt = require("bcrypt");
const signIn = async (req, res) => {
  const body = req.body;
  try {
    const getUser = await UserModel.findOne({ user: body.user });

    if (!getUser) return res.status(404).json({ message: "user not found" });
    const { user, _id, role, password } = getUser;

    const compare = await bcrypt.compare(body.password, password);
    if (user !== body.user || !compare) {
      return res
        .status(404)
        .json({ message: "incorrect user name or password" });
    }
    const token = jwt.sign({ user, role, _id }, secreteKey, {
      expiresIn: "1d",
    });

    res.cookie("jwt", token, {
      maxAge: 1 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    res.status(202).json({ role, user });
  } catch (error) {
    // console.log(error);
    res.sendStatus(500);
  }
};
module.exports = signIn;
