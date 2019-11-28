const mongoose = require("mongoose"),
  Schema = mongoose.Schema,
  ObjectId = Schema.Types.ObjectId;

var validatePhone = function(contact) {
  var re = /^\d{10}$/;
  return contact == null || re.test(contact);
};

const visitorSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    phone: {
      type: Number,
      required: false,
      unique: true,
      validate: [validatePhone, "Please fill a valid phone number"]
    },
    email: {
      type: String,
      unique: true
    },
    address: {
      type: String,
      required: true
    },
    check_in_time: {
      type: String
    },
    check_out_time: {
      type: String,
      default: "Not checked out"
    },
    host_alloted: {
      type: ObjectId,
      ref: "Host"
    },
    checked_in: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Visitor", visitorSchema);
