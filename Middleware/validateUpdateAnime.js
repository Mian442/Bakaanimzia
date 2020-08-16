const { validateUpdate } = require("../Model/anime");
function validateUpdateAnime(req, res, next) {
  let { error } = validateUpdate(req.body);
  if (error) {
    console.log("error:", error);
    return res.status(402).send(error.details[0].message);
  }
  next();
}
module.exports = validateUpdateAnime;
