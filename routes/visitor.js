const router = require("express").Router(),
  moment = require("moment");

const Visitor = require("../models/visitor"),
  Host = require("../models/host"),
  {
    compareHostsByVisitorCount,
    getRenderData
  } = require("../controllers/functions/utils"),
  sendMail = require("../controllers/functions/mail"),
  sendSMS = require("../controllers/functions/sms");

// render the checkin page
router.get("/checkin", (req, res) => {
  res.render("visitor_checkin", getRenderData(req));
});

// render the checkout page
router.get("/checkout", (req, res) => {
  res.render("visitor_checkout", getRenderData(req));
});

// checkin the visitor,
router.post("/checkin", async (req, res) => {
  try {
    /**
     * get host with least visitors
     */
    const hosts = await Host.find();
    if (hosts.length === 0) {
      console.log("No hosts are currently available");

      req.flash("error", "No hosts are currently available");
      return res.redirect("/visitor/checkin");
    }
    hosts.sort(compareHostsByVisitorCount);
    const host = hosts[0];

    /**
     * check if visitor has visited before, else create new one
     */
    let visitor;
    visitor = await Visitor.findOne({
      email: req.body.email
    });
    if (!visitor) {
      visitor = await Visitor.create(req.body);
    } else {
      if (visitor.checked_in) {
        console.log("Visitor is already checked in");

        req.flash("error", "Visitor is already checked in");
        return res.redirect("/visitor/checkin");
      }
    }

    /**
     * update visitor and host
     */
    host.visitor_count += 1;
    visitor.host_alloted = host.id;
    visitor.checked_in = true;
    visitor.check_in_time = moment(visitor.createdAt).format("lll");

    await host.save();
    await visitor.save();

    /**
     * message and email the host
     */
    const msg = `    
     New Visitor with following details is coming to visit you:
     Visitor Name : ${visitor.name},
     Visitor Phone : ${visitor.phone},
     Visitor Email : ${visitor.email},
     Check-in Time : ${visitor.check_in_time}
     `;

    sendMail(host.email, msg);

    const hostPhone = "+91" + host.phone;
    sendSMS(hostPhone, msg);

    req.flash(
      "success",
      `Welcome ${visitor.name}! Your host ${host.name} is waiting for you inside!`
    );
    res.redirect("/visitor/checkin");
  } catch (err) {
    console.log(err);

    req.flash("error", "Couldn't checkin visitor");
    res.redirect("/visitor/checkin");
  }
});

// checking out the visitor
router.post("/checkout", async (req, res) => {
  try {
    /**
     * get visitor
     */
    const visitor = await Visitor.findOne({
      email: req.body.email,
      checked_in: true
    }).populate("host_alloted");

    if (!visitor) {
      console.log("The visitor cannot be found");

      req.flash("error", "The visitor is not checked-in");
      return res.redirect("/visitor/checkout");
    }

    /**
     * get host
     */
    const host = await Host.findByIdAndUpdate(visitor.host_alloted, {
      new: true
    });

    if (!host) {
      console.log("The host cannot be found");

      req.flash("error", "The host cannot be found");
      return res.redirect("/visitor/checkout");
    }

    /**
     * Update visitor and host
     */
    const checkOutTime = moment().format("LT");
    visitor.check_out_time = checkOutTime;
    visitor.checked_in = false;

    host.visitor_count -= 1;

    // save visitor
    await visitor.save();
    await host.save();

    /**
     * message and email the visitor
     */
    const msg = `    
    Thanks for visiting! Your visiting details are - 
    Visitor Name : ${visitor.name},
    Visitor Phone : ${visitor.phone},
    Check-in Time : ${visitor.check_in_time},
    Check-out Time : ${visitor.check_out_time},
    Host Name : ${visitor.host_alloted.name},
    Address Visited : ${visitor.address}
    `;

    sendMail(visitor.email, msg);

    const visitorPhone = "+91" + visitor.phone;
    sendSMS(visitorPhone, msg);

    req.flash(
      "success",
      `${visitor.name} checked out at ${visitor.check_out_time}`
    );
    res.redirect("/visitor/checkout");
  } catch (err) {
    console.log(err);

    req.flash("error", "The visitor is not checked out");
    res.redirect("/visitor/checkout");
  }
});

module.exports = router;
