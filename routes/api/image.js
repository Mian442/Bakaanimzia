var express = require("express");
var router = express.Router();
var cloudinary = require("cloudinary").v2;
var config = require("config");
var multer = require("multer");
var auth = require("../../Middleware/auth");
var admin = require("../../Middleware/admin");
var expressfileupload = require("express-fileupload");
const c = require("config");
router.use(expressfileupload({ useTempFiles: true }));
cloudinary.config({
  cloud_name: config.get("cloud_name"),
  api_key: config.get("cloud_API_Key"),
  api_secret: config.get("cloud_API_Secert"),
});
var upload = multer({ dest: "public/images/test" });
//Post an image/video
router.post("/upload/image", async (req, res) => {
  console.log(req.query);
  cloudinary.uploader.upload(
    req.files.image.tempFilePath,
    {
      resource_type: "image",
      public_id: "Anime/" + req.query.id + "/" + req.files.image.name,
      overwrite: true,
    },
    (err, result) => {
      return res.status(200).send("File is Uploaded");
    }
  );
});
//Post an video
router.post("/upload/video", async (req, res) => {
  console.log(req.query);
  cloudinary.uploader.upload(
    req.files.image.tempFilePath,
    {
      resource_type: "video",
      chunk_size: 6000000,
      public_id: "Anime/" + req.query.id + "/" + req.files.image.name,
      overwrite: true,
    },
    (err, result) => {
      return res.status(200).send("File is Uploaded");
    }
  );
});

module.exports = router;
