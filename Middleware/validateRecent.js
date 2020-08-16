const { validate } = require("../Model/recent");
function validateAnime(req, res, next) {
  let { error } = validate(req.body);
  if (error) res.status(404).send(error.details[0].message);
  next();
}
module.exports = validateAnime;
