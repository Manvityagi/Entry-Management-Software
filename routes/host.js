const router = require("express").Router(),
  Host = require("../models/host");

router.get("/", (req, res) => {
  res.render("host");
});


router.post("/", (req, res) => {
  try {
    const newHost = await Host.create(req.body); 
         console.log(newHost);
         res.redirect("/host");
   } catch(err) {
     console.log(err);
     res.status(400).send(err.message);
   }
 });

module.exports = router;
