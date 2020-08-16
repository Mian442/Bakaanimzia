var mongoose = require("mongoose");
var Joi = require("@hapi/joi");
var RecentSchema = mongoose.Schema({
  anime_id: String,
  title: String,
  pic: String,
  episode: { url: String, title: String, views: Number },
});
var Recent = mongoose.model("recents", RecentSchema);

function validateRecent(data) {
  var schema = Joi.object({
    anime_id: Joi.string().required(),
    title: Joi.string().required(),
    pic: Joi.string().required(),
    episode: Joi.array().required(),
  });
  return schema.validate(data, { abortEarly: false });
}
module.exports.Recent = Recent;
module.exports.validate = validateRecent;
