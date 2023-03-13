const mongoose = require("mongoose");

const ResultSchema = new mongoose.Schema({
  enrollment_no: {
    type: String,
    required: true,
  },

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
    required: true
  },

  subjects: [String],

  backlog_subs: [String],

  result: [
    {
      sub_name: {
        type: String,
      },

      midsem_exam: {
        type: Number,
        default: 0,
      },

      final_exam: {
        type: Number,
        default: 0,
      },

      viva_marks: {
        type: Number,
        default: 0,
      },

      credit: {
        type: Number,
        default: 0
      }
    },
  ],
});

module.exports = mongoose.model("Result", ResultSchema);
