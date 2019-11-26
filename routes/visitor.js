const router = require("express").Router(),
  moment = require("moment");

const Visitor = require("../models/visitor"),
  Host = require("../models/host"),
  compare = require("../controllers/functions/utils"),
  mail = require("../controllers/functions/mail"),
  sms = require("../controllers/functions/sms");

// router.get("/checkin", (req, res) => {
//   res.render("visitor_checkin",{host: null,visitor: null});
// });

router.get("/checkin", (req, res) => {
  res.render("visitor_checkin");
});

router.get("/checkout", (req, res) => {
  res.render("visitor_checkout");
});

router.post("/checkin", async (req, res) => {
  try {
    const newVisitor = await Visitor.create(req.body);
    const hosts = await Host.find();
    hosts.sort(compare);
    //aloting the first host from array to newVisitor
    newVisitor.host_alloted = hosts[0].name;
    //also increase count of visitors for hosts[0].name by 1
    hosts[0].visitor_count += 1;
    newVisitor.checked_in = true;

    res.render("visitor_checkin", {
      visitor: newVisitor,
      host: hosts[0].name
    });

    const { name, email, phone, createdAt, host_alloted, address } = newVisitor;
    const check_in_time = moment(createdAt).format("lll");
    newVisitor.check_in_time = check_in_time;
    console.log(check_in_time);
    newVisitor.save();
    console.log(newVisitor.check_in_time);
    hosts[0].save();

    const msg = `    
     New Visitor Details
     Visitor Name : ${name},
     Visitor Phone : ${phone},
     Visitor Email : ${email},
     Check-in Time : ${check_in_time},
     Host : ${host_alloted}
     `;

    //mail the host alloted
    mail(hosts[0].email, msg);

    //sms the host alloted
    const host_phone = "+91" + hosts[0].phone;
    sms(host_phone, msg);
  } catch (err) {
    console.log(err);
    res.status(400).send(err.message);
  }
});

router.post("/checkout", async (req, res) => {
  try {
    const visitor = await Visitor.findOne({ email: req.body.email });

    if (!visitor) return res.status(404).send("The visitor did not check in");

    const check_out = moment().format("LT");
    visitor.checked_in = false;
    visitor.check_out_time = check_out;
    const { name, email, phone, createdAt, host_alloted, address,check_in_time } = visitor;

    visitor.save();

    const msg = `    
    Visiting Details 
    Visitor Name : ${name},
    Visitor Phone : ${phone},
    Check-in Time : ${check_in_time},
    Check-out Time : ${check_out},
    Host Name : ${host_alloted},
    Address Visited : ${address}
    `;

    //mail the visitor
    mail(visitor.email, msg);

    //sms the visitor
    const d = new Date();
    visitor.check_out_time = d.getTime();
    visitor.save();
    const visitor_phone = "+91" + visitor.phone;

    sms(visitor_phone, msg);
  } catch (err) {
    res.status(400).send(err.message);
  }
  res.redirect("/visitor/checkout");
});

module.exports = router;
