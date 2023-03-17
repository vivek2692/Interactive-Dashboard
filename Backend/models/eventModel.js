const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  skills: [String],
  description: {
    type: String,
    required: true,
  },
  cordinator: {
    type: String,
    required: true,
  },
  contact_no: {
    type: Number,
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
  link: {
    type: String,
  },
});

module.exports = mongoose.model("Event", eventSchema);
