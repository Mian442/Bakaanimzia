var express = require("express");
var router = express.Router();
let { User } = require("../../Model/user");
var vsignup = require("../../Middleware/validatesignup");
var vlogin = require("../../Middleware/validateuser");
var bcrypt = require("bcryptjs");
const _ = require("lodash");
var auth = require("../../Middleware/auth");
const jwt = require("jsonwebtoken");
const config = require("config");

//get user
router.get("/:id", auth, async (req, res) => {
  let user = await User.findById(req.params.id);
  if (!user) return res.send({ msg: "User Not Registered", status: 404 });
  res.send({
    name: user.name,
    email: user.email,
    role: user.role,
    pic: user.pic,
    bookmark: user.bookmark ? user.bookmark : null,
    status: 200,
  });
});

//post userbook
router.post("/:id/bookmarks", auth, async (req, res) => {
  try {
    let user = await User.findById(req.params.id);
    if (!user) return res.status(404).send("User Not Registered");
    console.log(user.bookmark, res.body);
    user.bookmark.push(req.body);
    user.save();
    res.status(200).send({ msg: "Bookmark Added", status: 200 });
  } catch (err) {
    return res.status(400).send("Invalid ID!");
  }
});

//delete userbook
router.delete("/:id/bookmarks/:index", auth, async (req, res) => {
  try {
    let user = await User.findById(req.params.id);
    if (!user) return res.status(404).send("User Not Registered");
    let a = user.bookmark;
    a.splice(req.params.index, 1);
    user.bookmark = a;
    user.save();
    res.status(200).send({ msg: "Bookmark Deleted!", status: 200 });
  } catch (err) {
    return res.status(400).send("Invalid ID!");
  }
});
//Post pic
router.put("/:id", auth, async (req, res) => {
  let user = await User.findById(req.params.id);
  if (!user) return res.send("User Not Registered");
  user.pic = req.body.pic;
  user.save();
  res.send("Profile Pic Updated!");
});

//Post Sign UP
router.post("/signup", vsignup, async (req, res) => {
  console.log(req.body);
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.send("User with given Email already exist");
  user = new User();
  user.name = req.body.name;
  user.email = req.body.email;
  user.password = req.body.password;
  if (req.body.role) {
    user.role = req.body.role;
  }
  await user.generateHashedPassword();
  await user.save();
  let token = jwt.sign(
    { _id: user._id, name: user.name, role: user.role },
    config.get("jwtPrivateKey")
  );
  let datatoRetuen = {
    name: user.name,
    email: user.email,
    token: token,
  };
  return res.send(datatoRetuen);
});

//Post Login
router.post("/login", vlogin, async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.send({ error: "User Not Registered", status: 400 });
  let isValid = await bcrypt.compare(req.body.password, user.password);
  if (!isValid) return res.send({ error: "Invalid Password", status: 204 });
  let token = jwt.sign(
    { _id: user._id, name: user.name, role: user.role },
    config.get("jwtPrivateKey")
  );
  res.send({ token, msg: "Login Successfull!", status: 200 });
});

module.exports = router;
