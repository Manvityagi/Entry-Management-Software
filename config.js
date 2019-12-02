const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  admin_mail: process.env.admin_mail,
  admin_mail_pass: process.env.admin_mail_pass,
  admin_phone: process.env.admin_phone,
  admin_pin: process.env.admin_pin,
  db_host: process.env.db_host,
  db_name: process.env.db_name,
  db_user: process.env.db_user,
  db_pwd: process.env.db_pwd,
  twilio_sid: process.env.twilio_sid,
  twilio_auth_token: process.env.twilio_auth_token,
  cookie_secret: process.env.cookie_secret,
  session_secret: process.env.session_secret
};
