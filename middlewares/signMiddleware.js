const signMiddleware = (req, res, next) => {
  const cookie = req.cookie?.jwt;
  if (!cookie) {
    res.redirect("/");
  } else {
    next();
  }
};

module.exports = signMiddleware;
