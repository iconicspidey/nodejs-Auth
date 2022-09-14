const UserModel = require("../model/userModel");
const { isValidObjectId } = require("mongoose");
const jwt = require("jsonwebtoken");
const secreteKey = "bab317fce676aac031f5a6dea46dab7e072c4826";

const remove = async (req, res) => {
  const cookie = req.cookies?.jwt;
  const params = req.params.id;
  const verify = jwt.verify(cookie, secreteKey);
  const validId = isValidObjectId(params);
  try {
    if (!validId) return res.json({ message: "incorrect id" });
    if (verify.role !== "admin") return res.json({ message: "user not admin" });
    if (verify._id === params._id) {
      const user = await UserModel.findByIdAndDelete(params);
      res.clearCookie("jwt");
    } else {
      const user = await UserModel.findByIdAndDelete(params);
      res.status(200).json(user);
    }
    res.json({ message: "success deleted" });
  } catch (error) {
    res.sendStatus(500);
  }
};
const makeAdmin = async (req, res) => {
  const { role } = req.body;
  const cookie = req.cookies?.jwt;
  const params = req.params.id;
  const validId = isValidObjectId(params);
  console.log(role);
  if (!cookie) return res.json({ message: "not authenticate" });
  const verify = jwt.verify(cookie, secreteKey);
  if (verify.role !== "admin") return res.json({ message: "user not admin" });
  try {
    if (!validId) return res.json({ message: "incorrect id" });
    const user = await UserModel.findByIdAndUpdate(
      { _id: params },
      { role: "admin" }
    );
    if (!user) return res.json({ message: "no such user" });
    res.json({ message: "success" });
  } catch (error) {
    res.sendStatus(500);
  }
};
module.exports = { remove, makeAdmin };
