const router = require("express").Router(),
  moment = require("moment");

const Visitor = require("../models/visitor"),
  Host = require("../models/host"),
  compare = require("../controllers/functions/utils"),
  mail = require("../controllers/functions/mail"),
  sms = require("../controllers/functions/sms");

  //render the check in page
router.get("/checkin", (req, res) => {
  res.render("visitor_checkin");
});

//render the checkout page
router.get("/checkout", (req, res) => {
  res.render("visitor_checkout");
});


//checkin the visitor, 
router.post("/checkin", async (req, res) => {
  try {
    const newVisitor = await Visitor.create(req.body);
    const hosts = await Host.find();
    hosts.sort(compare);
    //aloting the first host from array to newVisitor
    newVisitor.host_alloted = hosts[0];
    //also increase count of visitors for hosts[0].name by 1
    hosts[0].visitor_count += 1;
    newVisitor.checked_in = true;
    req.flash(
      "success",
      "Welcome " +
        newVisitor.name +
        "! Your host " +
        hosts[0].name +
        " is waiting for you inside!"
    );

    const { name, email, phone, createdAt, host_alloted, address } = newVisitor;
    const check_in_time = moment(createdAt).format("lll");
    newVisitor.check_in_time = check_in_time;
    newVisitor.checked_in = true;
    await newVisitor.save();
    await hosts[0].save();

    //message for host
    const msg = `    
     New Visitor with following details is coming to visit you:
     Visitor Name : ${name},
     Visitor Phone : ${phone},
     Visitor Email : ${email},
     Check-in Time : ${check_in_time}
     `;

    //mail the host alloted
    mail(hosts[0].email, msg);

    //sms the host alloted
    const host_phone = "+91" + hosts[0].phone;
    sms(host_phone, msg);

    res.render("visitor_checkin");
  } catch (err) {
    req.flash("error", err.message);
    return res.render("visitor_checkin");
  }
});


//checking out the visitor 
router.post("/checkout", async (req, res) => {
  try {
    const visitor = await Visitor.findOne({
      email: req.body.email,
      checked_in: true
    }).populate("host_alloted");

    if (!visitor) {
      req.flash("error", "The visitor is not checked-in");
      return res.render("visitor_checkout");
    }

    const check_out = moment().format("LT");
    visitor.check_out_time = check_out;
    visitor.checked_in = false;

    const host = await Host.findByIdAndUpdate(visitor.host_alloted, {
      new: true
    });
    host.visitor_count -= 1;
    host.save();

    await visitor.save();

    const { name, phone, host_alloted, address, check_in_time } = visitor;

    //message for visitor
    const msg = `    
    Thanks for visiting! Your visiting details are - 
    Visitor Name : ${name},
    Visitor Phone : ${phone},
    Check-in Time : ${check_in_time},
    Check-out Time : ${check_out},
    Host Name : ${host_alloted.name},
    Address Visited : ${address}
    `;

    //mail the visitor
    mail(visitor.email, msg);

    const visitor_phone = "+91" + visitor.phone;

    //sms the visitor
    sms(visitor_phone, msg);

    req.flash(
      "success",
      visitor.name + " checked out at " + visitor.check_out_time
    );

    res.redirect("/visitor/checkout");
  } catch (err) {
    // req.flash("error", err.message);
    // return res.render("visitor_checkout");
    res.status(400).send(err.message);
  }
});

module.exports = router;
