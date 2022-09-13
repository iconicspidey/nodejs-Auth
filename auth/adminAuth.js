const UserModel = require("../model/userModel");
const { isValidObjectId } = require("mongoose");
const jwt = require("jsonwebtoken");
const secreteKey = "bab317fce676aac031f5a6dea46dab7e072c4826";

const remove = async (req, res) => {
  const cookie = req.cookies?.jwt;
  const verify = jwt.verify(cookie, secreteKey);
  const params = req.params.id;
  const validId = isValidObjectId(params);
  try {
    if (!validId) return res.json({ message: "incorrect id" });
    if (verify.role !== "admin") return res.json({ message: "user not admin" });
    const user = await UserModel.findByIdAndDelete(params);
    if (!user) return res.json({ message: "something went wrong" });
    res.json({ message: "success deleted" });
    if (user.role === "admin") {
      res.clearCookie("jwt");
      res.location("/");
    }
  } catch (error) {
    res.sendStatus(500);
  }
};
const makeAdmin = async (req, res) => {
  const cookie = req.cookies?.jwt;
  const params = req.params.id;
  const validId = isValidObjectId(params);
  if (!cookie) return res.json({ message: "not authenticate" });
  const verify = jwt.verify(cookie, secreteKey);
  if (verify.role !== "admin") return res.json({ message: "user not admin" });
  try {
    if (!validId) return res.json({ message: "incorrect id" });
    const user = await UserModel.findByIdAndUpdate({ _id: params });
    if (!user) return res.json({ message: "no such user" });
    res.json({ message: "success" });
  } catch (error) {
    res.sendStatus(500);
  }
};
module.exports = { remove, makeAdmin };
