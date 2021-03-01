const router = require("express").Router();
const s3 = require("../../utilities/awsS3");
const bucketName = "project2bucketmhowe1";
const { User, UserContent } = require("../../models");

const s3Obj = new s3();

router.post("/upload/profileIMG", async (req, res) => {
  console.log(req.files.img);
  return new Promise(async (resolve, reject) => {
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
        req.session.currentContentID = data.id;
        console.log(req.session.currentContentID);
        res.json(data);
        resolve(data);
      });
      //res.json(inFile);
    } else {
      res.json(`No file recived`);
      reject(false);
    }
  });
});

router.post("/upload/projectIMG/:id", async (req, res) => {
  console.log(req.files.img);

  if (req.session.currentContentID) {
    if (req.files.img) {
      //res.json(`uploaded file name: ${req.files.file.name}`);
      let inFile = await s3Obj.uploadFile(
        bucketName,
        req.files.img.name,
        req.files.img.data
      );
      userProfileIMG = `user_profile_img_${req.params.id}`;
      UserContent.update(
        { user_profile_img_1: inFile.Location },
        {
          where: {
            id: req.session.currentContentID,
          },
        }
      ).then((data) => {
        res.json(data);
      });
    }
  }
});

module.exports = router;
