const logout = (req, res) => {
  res.clearCookie("jwt");
  res.location("/");
};
module.exports = logout;
