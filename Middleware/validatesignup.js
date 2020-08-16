const { validate } = require("../Model/user");
function validateSignup(req, res, next) {
  let { error } = validate(req.body);
  console.log(error);
  if (error) return res.send({ error: error.details[0].message });
  next();
}
module.exports = validateSignup;
