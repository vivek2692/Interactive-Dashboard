const mongoose = require("mongoose");

const skillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  enrollment_no: {
    type: String,
    required: true,
  },
  contact_no: {
    type: String,
    required: true,
  },
  email: {
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
  skills: [String],
  hobbies: [String],
});

module.exports = mongoose.model("Skill", skillSchema);
