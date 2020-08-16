function admin(req, res, next) {
  if (req.user.role != "admin") {
    return res.status(401).send("You are not authorized");
  }
  next();
}
module.exports = admin;
