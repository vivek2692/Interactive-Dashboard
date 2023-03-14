const mongoose = require("mongoose");

const CourseraSchema = new mongoose.Schema({
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

  courses: [
    {
      semester: {
        type: Number,
      },

      certificates: [
        {
          name: {
            type: String,
          },

          image: {
            type: String,
          },
        },
      ],
    },
  ],
});

module.exports = mongoose.model("Coursera", CourseraSchema);
