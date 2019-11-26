const moment = require("moment");
const { twilio_sid, twilio_auth_token, admin_phone } = require("../../config");
const client = require("twilio")(twilio_sid, twilio_auth_token);



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
