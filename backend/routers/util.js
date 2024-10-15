const multer = require("multer");
const router = require("express").Router();

// to configure file save
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./static/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage }).single("myfile");

router.post("/uploadfile", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      console.log(err);
      res.status(400).send("Something went wrong!");
    }
    res.send(req.file);
  });
});

module.exports = router;
