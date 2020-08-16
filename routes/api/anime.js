var express = require("express");
var router = express.Router();
var ValidateAnime = require("../../Middleware/validateAnime");
var ValidateUpdateAnime = require("../../Middleware/validateUpdateAnime");
var auth = require("../../Middleware/auth");
var admin = require("../../Middleware/admin");
var { Anime } = require("../../Model/anime");

//Get all Anime
router.get("/", async (req, res) => {
  let anime = await Anime.find();
  return res.send(anime);
});

//Get single Anime
router.get("/:id", async (req, res) => {
  try {
    console.log(req.params.id);
    let anime = await Anime.findById(req.params.id);
    console.log(anime);
    if (!anime) return res.status(404).send("Anime is not Availabe");
    return res.status(200).send(anime);
  } catch (err) {
    return res.status(400).send("Invalid Anime Get Request!");
  }
});

//Get episode Anime
router.get("/:id/episode", async (req, res) => {
  let anime = await Anime.findById(req.params.id);
  if (!anime) return res.status(404).send("Invalid Anime!");
  try {
    return res.status(200).send(anime.episode);
  } catch (err) {
    return res.status(400).send("Invalid Episodes Get Request!");
  }
});

//Get single episode Anime
router.get("/:id/episode/:index", async (req, res) => {
  try {
    let anime = await Anime.findById(req.params.id);
    if (!anime) {
      return res.send({ error: "Invalid Id", status: 404 });
    }
    if (anime.episode[req.params.index]) {
      return res.send({
        episode: anime.episode[req.params.index],
        status: 200,
      });
    } else {
      return res.send({ error: "Invalid Index", status: 400 });
    }
  } catch (err) {
    return res.send({
      error: "Invalid Single Episode Get Request!",
      status: 400,
    });
  }
});

//Delete single episode Anime
router.delete("/:id/episode/:index", auth, admin, async (req, res) => {
  try {
    let anime = await Anime.findById(req.params.id);
    if (!anime) {
      return res.status(404).send("Invalid Anime");
    }
    anime.episode.splice(req.params.index, 1);
    anime.delete_ref.splice(req.params.index + 1, 1);
    anime.save();
    return res.status(200).send("Delete Success!");
  } catch (err) {
    return res.status(400).send("Invalid Delete Episode Request!");
  }
});

//Delete single Anime
router.delete("/:id", auth, admin, async (req, res) => {
  try {
    let anime = await Anime.findByIdAndDelete(req.params.id);
    if (!anime) {
      return res.status(404).send("Invalid Id");
    }
    return res.status(200).send("Successfully Deleted!");
  } catch (err) {
    return res.status(400).send("Invalid Delete Series Request!");
  }
});

//Insert Dummy Record For _id
router.post("/dummy", auth, admin, async (req, res) => {
  let anime = new Anime();
  anime.title = req.body.title;
  await anime.save();
  return res.status(200).send({ _id: anime._id });
});

//Insert a record
router.put("/:id", ValidateAnime, auth, admin, async (req, res) => {
  let anime = await Anime.findById(req.params.id);
  if (!anime) return res.status(404).send("Anime not registored");
  try {
    anime.title = req.body.title;
    anime.alt_title = req.body.alt_title;
    anime.pic = req.body.pic;
    anime.episode = req.body.episode;
    anime.genre = req.body.genre;
    anime.des = req.body.des;
    anime.sequal = req.body.sequal;
    anime.presequal = req.body.presequal;
    anime.season = req.body.season;
    anime.rating = req.body.rating;
    anime.synonyms = req.body.synonyms;
    anime.status = req.body.status;
    anime.type = req.body.type;
    anime.score = req.body.score;
    anime.delete_ref = req.body.delete_ref;
    await anime.save();
    return res.status(200).send("New Series is Added");
  } catch (err) {
    return res.status(400).send("Invalid New Series Post Request!");
  }
});

//update a record
router.put(
  "/update/:id",
  ValidateUpdateAnime,
  auth,
  admin,
  async (req, res) => {
    let anime = await Anime.findById(req.params.id);
    if (!anime) return res.status(404).send("Anime not registored");
    try {
      anime._id = req.body._id;
      anime.title = req.body.title;
      anime.alt_title = req.body.alt_title;
      anime.pic = req.body.pic;
      anime.episode = req.body.episode;
      anime.genre = req.body.genre;
      anime.des = req.body.des;
      anime.sequal = req.body.sequal;
      anime.presequal = req.body.presequal;
      anime.season = req.body.season;
      anime.rating = req.body.rating;
      anime.synonyms = req.body.synonyms;
      anime.status = req.body.status;
      anime.type = req.body.type;
      anime.score = req.body.score;
      anime.delete_ref = req.body.delete_ref;
      await anime.save();
      return res.status(200).send("Series is Updated");
    } catch (err) {
      return res.status(400).send("Invalid Series is Updated Request!");
    }
  }
);

//Update single episode Anime title
router.put("/:id/episode/:index", auth, admin, async (req, res) => {
  try {
    let anime = await Anime.findById(req.params.id);
    if (!anime) {
      return res.status(404).send("Invalid Anime");
    }
    anime.episode[req.params.index] = req.body;
    anime.save();
    return res.status(200).send("Update Title Success!");
  } catch (err) {
    return res.status(400).send("Invalid Update Title Request!");
  }
});

//Post episode Anime
router.post("/:id/episode", auth, admin, async (req, res) => {
  try {
    let anime = await Anime.findById(req.params.id);
    if (!anime) {
      return res.status(404).send("NO Episode Found");
    }
    req.body.map((i) => {
      anime.episode.push(i);
      anime.delete_ref.push(i.ref);
    });
    await anime.save();

    return res.status(200).send("Episode Added!");
  } catch (err) {
    return res.status(400).send("Invalid Episode Post Request!");
  }
});

module.exports = router;
