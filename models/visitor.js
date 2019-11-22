const mongoose = require("mongoose"),
  Schema = mongoose.Schema,
  ObjectId = Schema.Types.ObjectId;

import { isEmail } from "validator";

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
      type: String,
      validate: [isEmail, "invalid email"]
    },
    address_visited: {
      type: String,
      required: true
    },
    check_in_time: {
      type: Date
    },
    check_out_time: {
      type: Date,
      required: true,
    },
    host_alloted: {
        type: ObjectId,
        ref: "Visitor",
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Visitor", visitorSchema);
