const jwt = require("jsonwebtoken");
const config = require("config");
const { User } = require("../Model/user");
async function auth(req, res, next) {
  let token = req.header("x-auth-token");
  if (!token) return res.status(404).send("Token Not Provided");
  try {
    let user = jwt.verify(token, config.get("jwtPrivateKey"));
    req.user = await User.findById(user._id);
    if (!req.user) return res.status(404).send("User Not Registered");
  } catch (err) {
    return res.status(400).send("Invalid Token");
  }
  next();
}
module.exports = auth;
