const router = require("express").Router();

const userRouts = require("./user-routs");

router.use("/users", userRouts);

module.exports = router;
