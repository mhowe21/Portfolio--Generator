const router = require("express").Router();
const { User, UserContent } = require("../models");

router.get("https://rocky-stream-10071.herokuapp.com/", (req, res) => {
  res.render("home");
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/dashboard", (req, res) => {
  res.render("dashboard");
});

router.get("/portfolios", (req, res) => {
  console.log(req.session.user_id);
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

router.get("/portfolios/:id", (req, res) => {
  UserContent.findOne({
    where: {
      id: req.params.id,
      user_id: req.session.user_id,
    },
  }).then((data) => {
    const info = data.get({ plain: true });
    console.log(info);
    res.render("template1", { info });
    //res.json(info);
  });
});

module.exports = router;
