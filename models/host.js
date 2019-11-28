const mongoose = require("mongoose"),
  Schema = mongoose.Schema,
  ObjectId = Schema.Types.ObjectId;

var validatePhone = function(contact) {
  var re = /^\d{10}$/;
  return contact == null || re.test(contact);
};

const hostSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    phone: {
      type: Number,
      required: true,
      unique: true,
      validate: [validatePhone, "Please fill a valid phone number"]
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    address: {
      type: String,
      required: true
    },
    visitor_count: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Host", hostSchema);
