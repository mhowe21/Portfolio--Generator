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
        { [userProfileIMG]: inFile.Location },
        {
          where: {
            id: req.session.currentContentID,
          },
        }
      ).then((data) => {
        res.json(data);
      });
    } else {
      res.json("no file found");
    }
  } else if (!req.session.currentContentID) {
    let inFile = await s3Obj.uploadFile(
      bucketName,
      req.files.img.name,
      req.files.img.data
    );
    let userProfileIMG = `user_profile_img_${req.params.id}`;
    UserContent.create({
      user_id: req.session.user_id,
      [userProfileIMG]: inFile.Location,
    }).then((data) => {
      req.session.currentContentID = data.id;
      console.log(req.session.currentContentID);
      res.json(data);
    });
  }
});

router.post("/upload/data", async (req, res) => {
  if (!req.session.currentContentID) {
    UserContent.create({
      user_id: req.session.user_id,
      portfolio_name: req.body.name,
      portfolio_email: req.body.email,
      portfolio_github_link: req.body.github,
      portfolio_linkedin_link: req.body.linkedin,
      portfolio_aboutme: req.body.portfolio_aboutme,
      template_id: req.body.template_id,

    }).then((data) => {
      req.session.currentContentID = data.id;
      console.log(req.session.currentContentID);
      res.json(data);
    });
  } else if (req.session.currentContentID) {
    UserContent.update(
      {
      user_id: req.session.user_id,
      portfolio_name: req.body.name,
      portfolio_email: req.body.email,
      portfolio_github_link: req.body.github,
      portfolio_linkedin_link: req.body.linkedin,
      portfolio_aboutme: req.body.portfolio_aboutme,
      template_id: req.body.template_id,
      },
      {
        where: {
          id: req.session.currentContentID,
        },
      }
    ).then((data) => {
      res.json(data);
    });
  }
});

module.exports = router;
