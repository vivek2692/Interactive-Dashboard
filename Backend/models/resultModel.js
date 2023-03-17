const mongoose = require("mongoose");

const ResultSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
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

  current_semester: {
    type: Number,
    required: true,
  },

  batch: {
    type: String,
    required: true,
  },

  cgpa: {
    type: mongoose.Types.Decimal128,
    default: 0,
  },

  sub_credit_sum: {
    type: Number,
    default: 0,
  },

  sgpa: {
    type: mongoose.Types.Decimal128,
    default: 0,
  },

  subjects: [String],

  backlog_subs: [String],

  result: [
    {
      sub_name: {
        type: String,
      },

      internal_prac: {
        type: Number,
        default: 0,
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
        default: 0,
      },

      sub_credit: {
        type: Number,
        default: 0,
      },
    },
  ],
});

module.exports = mongoose.model("Result", ResultSchema);
