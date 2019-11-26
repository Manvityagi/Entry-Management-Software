const dotenv = require("dotenv");
dotenv.config();
module.exports = {
  admin_mail: process.env.admin_mail,
  admin_mail_pass: process.env.admin_mail_pass,
  admin_phone: process.env.admin_phone,
  db_user: process.env.db_user,
  db_pwd: process.env.db_pwd,
  twilio_sid: process.env.twilio_sid,
  twilio_auth_token: process.env.twilio_auth_token
};
