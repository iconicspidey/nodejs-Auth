const logout = (req, res) => {
  res.cookie("jwt", { maxAge: 1 });
  res.json({ message: "success" });
};
module.exports = logout;
