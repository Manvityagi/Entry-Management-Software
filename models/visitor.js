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
      required: false
    },
    email: {
      type: String
    },
    address: {
      type: String,
      required: true
    },
    check_in_time: {
      type: Date
    },
    check_out_time: {
      type: Date
    },
    host_alloted: {
      type: String,
      default: ""
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Visitor", visitorSchema);
