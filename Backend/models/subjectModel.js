const mongoose = require("mongoose");

const SubjectSchema = new mongoose.Schema({
  college: {
    type: String,
    required: true,
  },

  department: {
    type: String,
    required: true,
  },

  semester: {
    type: Number,
    required: true,
  },

  subs: [
    {
      sub_name: {
        type: String,
        required: true,
      },

      sub_credits: {
        type: Number,
        required: true,
      },
    },
  ],

  open_elective: [
    {
      sub_name: {
        type: String,
        required: true,
      },

      sub_credits: {
        type: Number,
        required: true,
      },
    },
  ],

  core_elective: [
    {
      sub_name: {
        type: String,
        required: true,
      },

      sub_credits: {
        type: Number,
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model("Subject", SubjectSchema);
