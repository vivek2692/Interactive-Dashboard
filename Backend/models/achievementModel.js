const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const achievementSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  enrollment_no: {
    type: String,
    required: true
  },
  event_name: {
    type: String,
    required: true,
  },
  certificate: {
    type: String,
    required: true,
  },
  organizer: {
    type: String,
    required: true,
  },
  level: {
    types: String,
  },
  description: {
    type: String,
    required: true,
  },
  position: {
    type: String,
  },
  semester: {
    type: Number,
    required: true,
  },
  batch: {
    type: Number,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  college: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Achievement", achievementSchema);
