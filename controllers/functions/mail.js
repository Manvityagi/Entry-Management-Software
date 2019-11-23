"use strict";
const nodemailer = require("nodemailer");

const { user, pass } = require("../../config");

// async..await is not allowed in global scope, must use a wrapper
// async function mail_visitor(recevier, client) {   //will be used when check_out ruts will be made
//     process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
//   const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: "chiefspammer@yourgreatdomain.com",
//       pass: "SuperSecretPassword" // naturally, replace both with your real credentials or an application-specific password
//     }
//   });

//   const mailOptions = {
//     from: "vindication@enron.com",
//     to: recevier,
//     subject: "Invoices due",
//     text: "Dudes, we really need your money."
//   };

//   let info = await transporter.sendMail(mailOptions);
//   console.log(info.response);

// }
// mail_visitor().catch(console.error);

async function mail_host(host, visitor) {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: user,
      pass: pass
    }
  });

  console.log(visitor.toObject());

  const { name, email, phone, createdAt } = visitor.toObject(); //"these details"

  const mailOptions = {
    from: "manvit770@gmail.com",
    to: host,
    subject: "New Visitor Details",
    text: `     
           Name : ${name},
           Email : ${email},
           Phone : ${phone},
           Checkin Time : ${createdAt}`
  };

  let info = await transporter.sendMail(mailOptions);
  // console.log(info.response);
}
mail_host().catch(console.error);

module.exports = mail_host;
