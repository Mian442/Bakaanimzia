var express = require("express");
var router = express.Router();
var { Popular } = require("../../../Model/popular");
var searchhValidation = require("../../../Middleware/searchValidation");

//Get anime with its name
router.get("/:name", searchhValidation, async (req, res) => {
  let popular = await Popular.find({
    title: { $regex: `${req.params.name}`, $options: "i" },
  });
  return res.send(popular);
});

module.exports = router;
