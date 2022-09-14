const jwt = require("jsonwebtoken");
const secreteKey = "bab317fce676aac031f5a6dea46dab7e072c4826";

function basicAuth(req, res, next) {
  const cookie = req.cookies?.jwt;
  jwt.verify(cookie, secreteKey, (err, decode) => {
    if (!err) {
      if (decode) {
        if (decode.role !== "basic") {
          return res.location("/admin");
        } else {
          return next();
        }
      } else {
        res.location("/");
      }
    } else {
      res.redirect("/");
    }
  });
}
function adminAuth(req, res, next) {
  const cookie = req.cookies?.jwt;
  if (cookie) {
    const decode = jwt.verify(cookie, secreteKey);
    if (decode.role !== "admin") {
      res.redirect("basic");
    } else {
      next();
    }
  } else {
    res.redirect("/");
  }
}
module.exports = { basicAuth, adminAuth };
