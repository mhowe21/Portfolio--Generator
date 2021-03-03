const router = require("express").Router();
const { User, UserContent } = require("../../models");

router.get("/", (req, res) => {
  res.render("home");
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/dashboard", (req, res) => {
  res.render("dashboard");
});

router.get("/portfolios", (req, res) => {
  UserContent.findAll({
    where: {
      user_id: req.session.user_id,
    },
  })
    .then((data) => {
      //res.json(data);
      const info = data.map((info) => info.get({ plain: true }));
      console.log(info);
      res.render("portfolios", { info });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
