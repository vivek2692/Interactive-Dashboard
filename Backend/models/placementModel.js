const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const placementSchema = new Schema({
  student_name: {
    type: String,
    required: true,
  },
  student_email: {
    type: String,
    required: true,
  },
  mobile_number: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  enrollment_no: {
    type: String,
    required: true,
  },
  student_address: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  placement_year: {
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
  package: {
    type: Number,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  contract_duration: {
    type: Number,
    required: true,
  },
  company_state: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Placement", placementSchema);
