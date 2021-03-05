const router = require("express").Router();
const apiRoutes = require("./api");
const homeRouts = require("./Primaryroutes");

router.use("/", homeRouts);
router.use("/api/v1/", apiRoutes);

module.exports = router;
