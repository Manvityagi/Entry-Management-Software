const dotenv = require("dotenv");
dotenv.config();
module.exports = {
  user: process.env.user,
  pass: process.env.pass,
  mongo_pass: process.env.mongo_pass
};
