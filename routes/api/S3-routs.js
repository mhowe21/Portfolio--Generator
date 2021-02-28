const router = require("express").Router();
const s3 = require("../../utilities/awsS3");
const bucketName = "project2bucketmhowe1";
const { User, UserContent } = require("../../models");

const s3Obj = new s3();

router.post("/upload", async (req, res) => {
  console.log(req.files.img);

  if (req.files.img) {
    //res.json(`uploaded file name: ${req.files.file.name}`);
    let inFile = await s3Obj.uploadFile(
      bucketName,
      req.files.img.name,
      req.files.img.data
    );
    UserContent.create({
      user_id: req.session.user_id,
      avatar_image_URI: inFile.Location,
    }).then((data) => {
      res.json(data);
    });
    //res.json(inFile);
  } else {
    res.json(`No file recived`);
  }
});

module.exports = router;
