const router = require("express").Router(),
  Visitor = require("../models/visitor"),
  Host = require("../models/host"),
  compare = require('../controllers/functions/utils'),
  mail_host = require('../controllers/functions/mail'),
  mail_visitor = require('../controllers/functions/mail'),
  sms_host = require('../controllers/functions/sms');

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

      //mail the host alloted
      mail_host(hosts[0].email,newVisitor);

      //sms the host alloted
      const host_phone = "+91" + hosts[0].phone;
      sms_host(host_phone,newVisitor);
    }
  });
});

module.exports = router;
