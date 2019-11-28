const nodemailer = require("nodemailer");

const { admin_mail, admin_mail_pass } = require("../../config");

function mail(to, msg) {
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

  transporter
    .sendMail(mailOptions)
    .then(result => {
      console.log("Mail successfully sent! Result:", result);
    })
    .catch(err => {
      console.log("Mail couldn't be sent. Err: ", err);
    });
}

module.exports = mail;
