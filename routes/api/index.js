const router = require("express").Router();

const userRouts = require("./user-routs");
const fileRouts = require("./S3-routs");
const portfolioRouts = require("./portfolio-routs");

router.use("/users", userRouts);
router.use("/files", fileRouts);
router.use("/portfolios", portfolioRouts);

module.exports = router;
