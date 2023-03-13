const mongoose = require("mongoose");

const Schema = mongoose.Schema();

const placementSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  salary: {
    type: Number,
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
  year: {
    type: Number,
    required: true,
  },
  studentId: {
    type: Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
});

module.exports = mongoose.model("Placement", placementSchema);
