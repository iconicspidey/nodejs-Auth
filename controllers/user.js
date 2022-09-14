const jwt = require("jsonwebtoken");
const UserModel = require("../model/userModel");

const getUser = async (req, res) => {
  const secreteKey = "bab317fce676aac031f5a6dea46dab7e072c4826";
  const cookie = req.cookies?.jwt;
  try {
    if (cookie) {
      const verify = jwt.verify(cookie, secreteKey);
      if (verify.role == "admin") {
        const admin = await UserModel.findById(verify._id);
        const users = await UserModel.find();
        res.status(200).json([admin, users]);
      } else {
        UserModel.findById({ _id: verify._id }, (err, data) => {
          if (!err) {
            res.status(200).json(data);
          }
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = getUser;
