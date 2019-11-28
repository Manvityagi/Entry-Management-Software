const { twilio_sid, twilio_auth_token, admin_phone } = require("../../config")
const client = require("twilio")(twilio_sid, twilio_auth_token);

function sms(to, msg) {
  client.messages
    .create({
      body: msg,
      from: admin_phone,
      to: to
    })
    .then(message =>
      console.log("Message successfully sent! Message SID: ", message.sid,to)
    )
    .catch(err => {
      // cannot redirect here because it is asynchronous
      console.log("Message couldn't be sent. Error: ", err);
    });
}

module.exports = sms;
