const { validate } = require("../Model/popular");
function validateAnime(req, res, next) {
  let { error } = validate(req.body);
  if (error) return res.status(404).send(error.details[0].message);
  next();
}
module.exports = validateAnime;
