const jwt = require("jsonwebtoken");
const UserModel = require("../model/userModel");

const getUser = (req, res) => {
  const secreteKey = "bab317fce676aac031f5a6dea46dab7e072c4826";
  const cookie = req.cookies?.jwt;
  try {
    if (cookie) {
      const verify = jwt.verify(cookie, secreteKey);
      if (verify.role == "admin") {
        UserModel.find((err, user) => {
          if (!err) {
            res.status(200).json(user);
          }
        });
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
