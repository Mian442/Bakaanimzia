const { validateUserLogin } = require("../Model/user");
function validatelogin(req, res, next) {
  let { error } = validateUserLogin(req.body);
  if (error) return res.send({ error: error.details[0].message });
  next();
}
module.exports = validatelogin;
