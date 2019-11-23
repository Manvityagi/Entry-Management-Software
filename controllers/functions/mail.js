"use strict";
const nodemailer = require("nodemailer"),
  moment = require("moment");

const { admin_mail, admin_mail_pass } = require("../../config");

async function mail(to, msg) {
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

  let info = await transporter.sendMail(mailOptions);
  console.log(info.response);
}
mail().catch(console.error);

module.exports = mail;
