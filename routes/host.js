const router = require("express").Router(),
  Host = require("../models/host"),
  { getRenderData } = require("../controllers/functions/utils");

// render the host registration page
router.get("/", (req, res) => {
  res.render("host", getRenderData(req));
});

// register the host with post request
router.post("/", async (req, res) => {
  try {
    const newHost = await Host.create(req.body);

    req.flash("success", `New Host ${newHost.name} has been registered!`);
    res.redirect("/host");
  } catch (err) {
    console.log(err);

    req.flash("error", "New host couldn't be registered");
    res.redirect("/host");
  }
});

module.exports = router;
