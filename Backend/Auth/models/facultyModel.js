const mongoose = require("mongoose");

const FacultySchema = new mongoose.Schema(
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

    college: {
        type: String,
        required: true
    },

    branch: {
      type: String,
      required: true
    },

    position: {
        type: String,
        required: true
    },

    contact: {
        type: String,
        required: true
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

module.exports = mongoose.model("Faculty", FacultySchema);