const { validate } = require("../Model/anime");
function validateAnime(req, res, next) {
  let { error } = validate(req.body);
  if (error) {
    console.log("error:", error);
    return res.send({
      error: error.details[0].message,
      status: 204,
    });
  }
  next();
}
module.exports = validateAnime;
