const router = require("express").Router(),
  Host = require("../models/host");

router.get("/", (req, res) => {
  res.render("host");
});

router.post("/", async (req, res) => {
  try {
    const newHost = await Host.create(req.body);
    //  console.log(newHost);
    req.flash("success", "New Host, " + newHost.name + " has been registered!");

    res.redirect("/host");
  } catch (err) {
    console.log(err);
    req.flash("error", err.message);
    res.render("host");
    //  res.status(400).send(err.message);
  }
});

module.exports = router;
