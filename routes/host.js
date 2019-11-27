const router = require("express").Router(),
  Host = require("../models/host");

  //Render the host registration page
router.get("/", (req, res) => {
  res.render("host");
});

//Register the host wit post request
router.post("/", async (req, res) => {
  try {
    const newHost = await Host.create(req.body);
     console.log(newHost);
    req.flash("success", "New Host, " + newHost.name + " has been registered!");

    return res.render("host");
  } catch (err) {
    console.log(err);
    req.flash("error", err.message);
    return res.render("host");
    //  res.status(400).send(err.message);
  }
});

module.exports = router;
