const router = require("express").Router();
const { User, UserContent } = require("../../models");

router.get("/", (req, res) => {
  UserContent.findAll({
    where: {
      user_id: req.session.user_id,
    },
  }).then((data) => {
    res.json(data);
  });
});

router.get("/:id", (req, res) => {
  UserContent.findOne({
    where: {
      user_id: req.session.user_id,
      id: req.params.id,
    },
  }).then((data) => {
    res.json(data);
  });
});

module.exports = router;
