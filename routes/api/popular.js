var express = require("express");
var router = express.Router();
var validatePopular = require("../../Middleware/validatePopular");
var auth = require("../../Middleware/auth");
var admin = require("../../Middleware/admin");
var { Popular } = require("../../Model/popular");

//Get all popular
router.get("/", async (req, res) => {
  let popular = await Popular.find().limit(30);
  return res.send(popular);
});

//delete popular
router.delete("/:id", async (req, res) => {
  try {
    let popular = await Popular.findByIdAndDelete(req.params.id);
    if (!popular)
      return res.status(404).send("Series is not found in Popular!");
    return res.status(200).send("Successfully Series is Deleted From Popular!");
  } catch (err) {
    return res.status(400).send("Bad Request");
  }
});

//Insert a popular
router.post("/", validatePopular, auth, admin, async (req, res) => {
  try {
    let popular = new Popular();
    popular.anime_id = req.body.anime_id;
    popular.title = req.body.title;
    popular.pic = req.body.pic;
    popular.genre = req.body.genre;
    popular.des = req.body.des;
    await popular.save();
    return res.status(200).send("Series Added in Popular Tag!");
  } catch (err) {
    return res.status(400).send("Bad Request");
  }
});

module.exports = router;
