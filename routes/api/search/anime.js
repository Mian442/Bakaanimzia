var express = require("express");
var router = express.Router();
var { Anime } = require("../../../Model/anime");
var searchhValidation = require("../../../Middleware/searchValidation");

//Ongoing Anime
router.get("/ongoing", async (req, res) => {
  let anime = await Anime.find({ status: "Ongoing" });
  return res.send(anime);
});

//latest Anime
router.get("/latest", async (req, res) => {
  try {
    let date = new Date();
    console.log(date.getFullYear(), date.getMonth());
    let season;
    if (date.getMonth() > 11 && date.getMonth() < 3) {
      season = "Winter " + date.getFullYear();
    } else if (date.getMonth() > 2 && date.getMonth() < 6) {
      season = "Spring " + date.getFullYear();
    }
    if (date.getMonth() > 5 && date.getMonth() < 8) {
      season = "Summer " + date.getFullYear();
    }
    if (date.getMonth() > 7 && date.getMonth() < 12) {
      season = "Fall " + date.getFullYear();
    }
    let anime = await Anime.find({ season: season });
    return res.status(200).send(anime);
  } catch (err) {
    return res.status(400).send("Bad Request");
  }
});

//Get List With Alphabet
router.get("/list/:alpha", async (req, res) => {
  let anime = await Anime.find({
    title: { $regex: `^${req.params.alpha}`, $options: "i" },
  });
  return res.send(anime);
});

//Get anime with its name
router.get("/:name", searchhValidation, async (req, res) => {
  let anime = await Anime.find({
    title: { $regex: `${req.params.name}`, $options: "i" },
  });
  console.log(anime);
  return res.send(anime);
});

module.exports = router;
