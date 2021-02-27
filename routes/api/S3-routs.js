const router = require("express").Router();
const s3 = require("../../utilities/awsS3");
const bucketName = "project2bucketmhowe1";

const s3Obj = new s3();

router.post("/upload", async (req, res) => {
  console.log(req.files.file);

  if (req.files.file) {
    //res.json(`uploaded file name: ${req.files.file.name}`);
    let inFile = await s3Obj.uploadFile(
      bucketName,
      req.files.file.name,
      req.files.file.data
    );
    res.json(inFile);
  } else {
    res.json(`No file recived`);
  }
});

module.exports = router;
