const mongoose = require("mongoose"),
  Schema = mongoose.Schema,
  ObjectId = Schema.Types.ObjectId;

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
    },
    email: {
      type: String,
      unique: true,
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
      type: String,
      default: ""
    },
    checked_in: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Visitor", visitorSchema);
