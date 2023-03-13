const mongoose = require("mongoose");

const FacultySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    faculty_id: {
      type: String,
      required: true,
      unique: true
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

    gender: {
      type: String,
      required: true
    },

    qualification: {
      type: String,
      required: true
    },

    position: {
      type: String,
      required: true
    },

    address: {
      type: String,
      required: true
    },

    college: {
      type: String,
      required: true
    },

    department: {
      type: String,
      required: true
    },

    role: {
      type: String,
      required: true,
      default: "faculty"
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