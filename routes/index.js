const router = require("express").Router();

router.use("/host", require("./host"));
router.use("/visitor", require("./visitor"));

router.get("/", async (req, res) => {
  res.render("landing");
});

module.exports = router;
