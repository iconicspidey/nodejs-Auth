const signMiddleware = (req, res, next) => {
  const cookie = req.cookie?.jwt;
  console.log(cookie);
  if (!cookie) {
    next();
  } else {
    res.redirect("/");
  }
};

module.exports = signMiddleware;
