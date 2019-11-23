const dotenv = require("dotenv");
dotenv.config();
module.exports = {
  admin_mail: process.env.admin_mail,
  admin_mail_pass: process.env.admin_mail_pass,
  admin_phone: process.env.admin_phone,
  mongo_pass: process.env.mongo_pass,
  twilio_sid: process.env.twilio_sid,
  twilio_auth_token: process.env.twilio_auth_token
};
