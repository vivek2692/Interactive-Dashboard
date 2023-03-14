const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const companySchema = new Schema({
  legal_name: {
    type: String,
    required: true,
  },
  legal_contact_no: {
    type: Number,
    required: true,
  },
  type_of_company: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  logo: {
    type: String,
    required: true,
  },
  HR_name: {
    type: String,
    required: true,
  },
  HR_contact_no: {
    type: Number,
    required: true,
  },
});

module.exports = ("CompanyDetails", companySchema);
