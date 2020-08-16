function searchvalidation(req, res, next) {
  if (req.params.name.length < 3) {
    return res.send({
      error: "String Length Must be Greater than 3 character",
      status: 204,
    });
  }
  next();
}
module.exports = searchvalidation;
