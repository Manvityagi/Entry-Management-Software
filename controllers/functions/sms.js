const moment = require("moment");
const { twilio_sid, twilio_auth_token, admin_phone } = require("../../config");
const client = require("twilio")(twilio_sid, twilio_auth_token);

// async function sms_host(host, visitor) {
//   const { name, email, phone, createdAt } = visitor.toObject();

//   let formatted_date = moment(createdAt).format("LLLL");

//   client.messages
//     .create({
//       body: `
//       Name : ${name},
//       Email : ${email},
//       Phone : ${phone},
//       Checkin Time : ${formatted_date}`,
//       from: admin_phone,
//       to: host
//     })
//     .then(message => console.log(message.sid))
//     .catch(err => console.log(err))
// }

async function sms(to, msg) {
  client.messages
    .create({
      body: msg,
      from: admin_phone,
      to: to
    })
    .then(message => console.log(message.sid))
    .catch(err => console.log(err));
}

module.exports = sms;
