const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      unique: true,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      ],
      required: true,
    },

    password: {
      type: String,
      required: true,
    },

    enrollment_no: {
        type: String,
        required: true,
        unique: true
    },

    branch: {
        type: String,
        required: true,
    },

    college: {
        type: String,
        required: true
    },

    contact: {
        type: String,
        required: true,
        unique: true
    },

    otp:{
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Student", StudentSchema);