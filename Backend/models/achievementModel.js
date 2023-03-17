const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const achievementSchema = new Schema({
  compi_name: {
    type: String,
    required: true,
  },
  certificate: {
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
  rank: {
    type: Number,
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
