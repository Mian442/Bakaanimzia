var express = require("express");
var router = express.Router();
var { Anime } = require("../../../Model/anime");

//get the specfic gener
router.get("/:gname", async (res, req) => {
  console.log(res.params.gname);
  let anime = await Anime.find({ genre: res.params.gname });
  return req.send(anime);
});

module.exports = router;
