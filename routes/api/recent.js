var express = require("express");
var router = express.Router();
var validateRecent = require("../../Middleware/validateRecent");
var auth = require("../../Middleware/auth");
var admin = require("../../Middleware/admin");
var { Recent } = require("../../Model/recent");

//Get all Recent
router.get("/", async (req, res) => {
  let recent = await Recent.find().limit(30);
  return res.send(recent);
});

//Delete a recent
router.delete("/:id", async (req, res) => {
  let recent = await Recent.findByIdAndDelete(req.params.id);
  if (!recent) return res.status(404).send("Series is not found in Recent!");
  return res.status(200).send("Successfully Series is Deleted From Recent!");
});

//Insert a recent record
router.post("/", validateRecent, auth, admin, async (req, res) => {
  let recent = new Recent();
  req.body.episode.map(async (i) => {
    recent.anime_id = req.body.anime_id;
    recent.name = req.body.name;
    recent.pic = req.body.pic;
    recent.title = req.body.title;
    recent.episode = i;
    await recent.save();
  });
  return res.status(200).send("Series is added in Recent!");
});
module.exports = router;
