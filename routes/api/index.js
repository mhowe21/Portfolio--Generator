const router = require("express").Router();

const userRouts = require("./user-routs");
const fileRouts = require("./S3-routs");

router.use("/users", userRouts);
router.use("/files", fileRouts);

module.exports = router;
