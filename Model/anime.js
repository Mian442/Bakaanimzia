var mongoose = require("mongoose");
var Joi = require("@hapi/joi");
const { join } = require("lodash");
var AnimeSchema = mongoose.Schema({
  title: String,
  alt_title: { eng_jp: String, jp_jp: String },
  pic: { url: String, ref: String },
  genre: Array,
  episode: [{ url: String, title: String, ref: String }],
  des: String,
  sequal: { _id: String, name: String },
  presequal: { _id: String, name: String },
  season: String,
  rating: String,
  synonyms: Array,
  status: String,
  type: String,
  score: Number,
  delete_ref: Array,
});
var Anime = mongoose.model("animes", AnimeSchema);

function validateProduct(data) {
  var schema = Joi.object({
    title: Joi.string().required(),
    alt_title: Joi.object().required(),
    pic: Joi.object(),
    genre: Joi.array().required(),
    episode: Joi.array(),
    des: Joi.string().required(),
    sequal: Joi.object(),
    presequal: Joi.object(),
    season: Joi.string().required(),
    rating: Joi.string().required(),
    synonyms: Joi.array(),
    status: Joi.string().required(),
    type: Joi.string().required(),
    score: Joi.number(),
    delete_ref: Joi.array(),
  });
  return schema.validate(data, { abortEarly: false });
}
function validateUpdateProduct(data) {
  var schema = Joi.object({
    _id: Joi.string().required(),
    __v: Joi.number(),
    title: Joi.string().required(),
    alt_title: Joi.object().required(),
    pic: Joi.object(),
    genre: Joi.array().required(),
    episode: Joi.array(),
    des: Joi.string().required(),
    sequal: Joi.object(),
    presequal: Joi.object(),
    season: Joi.string().required(),
    rating: Joi.string().required(),
    synonyms: Joi.array(),
    status: Joi.string().required(),
    type: Joi.string().required(),
    score: Joi.number(),
    delete_ref: Joi.array(),
  });
  return schema.validate(data, { abortEarly: false });
}
module.exports.Anime = Anime;
module.exports.validate = validateProduct;
module.exports.validateUpdate = validateUpdateProduct;
