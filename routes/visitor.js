const router = require("express").Router(),
  Visitor = require("../models/visitor"),
  Host = require("../models/host");

function compare(a, b) {
  return a.vistor_count < b.visitor_count;
}

router.get("/checkin", async (req, res) => {
  res.render("visitor_checkin");
});

router.get("/checkout", (req, res) => {
  res.render("visitor_checkout");
});

router.post("/checkin", (req, res) => {
  Visitor.create(req.body, async (err, newVisitor) => {
    if (err) {
      console.log(err);
    } else {
      const hosts = await Host.find();
      hosts.sort(compare);
      
      //aloting the first host from array to newVisitor
      newVisitor.host_alloted = hosts[0].name;

      //also increase count of visitors for hosts[0].name by 1
      hosts[0].visitor_count += 1;

      res.redirect("/visitor/checkin");
      newVisitor.save();
      hosts[0].save();
    }
  });
});

module.exports = router;
