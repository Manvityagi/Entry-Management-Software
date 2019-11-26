"use strict";
const nodemailer = require("nodemailer");

const { admin_mail, admin_mail_pass } = require("../../config");

async function mail(to, msg) {
  try {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: admin_mail,
        pass: admin_mail_pass
      }
    });

    const mailOptions = {
      from: admin_mail,
      to: to,
      subject: "New Visitor Details",
      text: msg
    };

    const info = await transporter.sendMail(mailOptions);
    // console.log(info.response);
  } catch (err) {
    req.flash("error", err.message);
    return res.redirect('back')
    console.log(err);
  }
}

module.exports = mail;
