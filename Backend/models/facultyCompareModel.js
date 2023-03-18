const mongoose = require("mongoose");

const FacultyCompSchema = new mongoose.Schema({
  college: {
    type: String,
    required: true,
  },

  department: {
    type: String,
    required: true,
  },
  facultyName: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  counter: {
    type: Number,
    default: 0,
  },

  students: [],
});

module.exports = mongoose.model("FacultyComp", FacultyCompSchema);
