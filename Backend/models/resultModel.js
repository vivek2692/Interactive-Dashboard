const mongoose = require('mongoose');

const ResultSchema = new mongoose.Schema({
    enrollment_no: {
        type: String,
        required: true
    },

    year: {
        type: String,
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

    results: [
        {
            semester: {
                type: Number
            },

            result: [
                {
                    sub_name: {
                        type: String
                    },

                    sub_credits: {
                        type: Number
                    },

                    marks: {
                        type: Number,
                        default: 0
                    }
                }
            ]
        }
    ]
}
);

module.exports = mongoose.model("Result", ResultSchema);