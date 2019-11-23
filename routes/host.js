const router = require("express").Router(),
  Host = require("../models/host");

router.get("/", (req, res) => {
  res.render("host");
});

router.post("/", (req, res) => {
  Host.create(req.body, (err, newHost) => {
    if (err) {
      console.log(err);
    } else {
      console.log(newHost);
      res.redirect("/host");
    }
  });
});

module.exports = router;
