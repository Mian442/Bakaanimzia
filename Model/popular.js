var mongoose = require("mongoose");
var Joi = require("@hapi/joi");
const { join } = require("lodash");
var PopularSchema = mongoose.Schema({
  anime_id: String,
  title: String,
  pic: String,
  genre: Array,
  des: String,
});
var Popular = mongoose.model("populars", PopularSchema);

function validatePopular(data) {
  var schema = Joi.object({
    anime_id: Joi.string().required(),
    title: Joi.string().required(),
    pic: Joi.string().required(),
    genre: Joi.array().required(),
    des: Joi.string().required(),
  });
  return schema.validate(data, { abortEarly: false });
}
module.exports.Popular = Popular;
module.exports.validate = validatePopular;
