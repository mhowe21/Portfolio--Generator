const router = require("express").Router();
const apiRoutes = require("./api");
const pageRoutes = require("./pages");

router.use("/", pageRoutes);
router.use("/api/v1/", apiRoutes);

module.exports = router;
