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

    department: {
        type: String,
        required: true,
    },

    college: {
        type: String,
        required: true
    },

    gender: {
      type: String,
      required: true
    },

    contact: {
        type: String,
        required: true,
        unique: true
    },

    admission_source: {
      type: String,
      required: true
    },

    address: {
      type: String,
      required: true
    },

    state: {
      type: String,
      required: true
    },

    documents: [
      {
        name: {
          type: String
        },
        image: {
          type: String
        }
      }
    ],

    // documents: [
    //   {
    //     name: {
    //       type: String,
    //       required: true
    //     },

    //     image: {
    //       type: String,
    //       required: true
    //     }
    //   }
    // ],

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