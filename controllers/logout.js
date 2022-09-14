const logout = (req, res) => {
  res.clearCookie("jwt");
  res.json({ message: "success" });
};
module.exports = logout;
