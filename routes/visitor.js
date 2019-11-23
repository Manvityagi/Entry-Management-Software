const router = require("express").Router(),
  Visitor = require("../models/visitor"),
  Host = require("../models/host"),
  compare = require("../controllers/functions/utils"),
  mail = require("../controllers/functions/mail"),
  sms = require("../controllers/functions/sms"),
  moment = require("moment");

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
      newVisitor.save();
      hosts[0].save();
      res.redirect('/');

    //   popupS.alert({
    //     content:
    //       "Hello ${newVisitor.name}!, `Your host ${newVisitor.host_alloted} is waiting for you inside!`"
    //   });

      const {
        name,
        email,
        phone,
        createdAt,
        host_alloted,
        address
      } = newVisitor;

      let check_in_time = moment(createdAt).format("lll");

      const msg = `    
    New Visitor Details
    Visitor Name : ${name},
    Visitor Phone : ${phone},
    Visitor Email : ${email},
    Check-in Time : ${check_in_time},
    `;

      //mail the host alloted
      mail(hosts[0].email, msg);

      //sms the host alloted
      const host_phone = "+91" + hosts[0].phone;
      sms(host_phone, msg);
    }
  });
});

router.post("/checkout", async (req, res) => {
  try {
    const visitor = await Visitor.findOne({ email: req.body.email });

    if (!visitor) return res.status(404).send("The visitor did not check in");

    const { name, email, phone, createdAt, host_alloted, address } = visitor;
    let check_in_time = moment(createdAt).format("lll");
    let check_out = moment().format("LT");
    visitor.check_out_time = check_out;
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
    var d = new Date();
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
