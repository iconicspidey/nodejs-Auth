const UserModel = require("../model/userModel");

const signUp = async (req, res) => {
  const { body } = req;
  try {
    const user = await UserModel.find({ user: body.user });
    if (user) return res.status(208).json({ error: "user already exist" });

    const createUser = await UserModel.create({ ...body, role: "basic" });
    await res.status(201).json({ message: "success" });
  } catch (error) {
    console.log(error);
  }
};
module.exports = signUp;
