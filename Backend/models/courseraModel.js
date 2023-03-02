const mongoose = require('mongoose');

const CourseraSchema = new mongoose.Schema({
    enrollment_no: {
        type: String,
        required: true
    },

    semester: {
        type: Number,
        required: true
    },

    college: {
        type: String,
        required: true
    },

    department: {
        type: String,
        required: true
    },

    courses: [
        {
            name: {
                type: String
            },

            image: {
                type: String
            }
        }
    ]
});

module.exports = mongoose.model("Coursera", CourseraSchema);