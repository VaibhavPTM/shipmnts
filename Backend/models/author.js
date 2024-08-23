const mongoose = require("mongoose");

const authorSchema = new mongoose.Schema(
    {
        name: {
            type: String,
        },
        email: {
            type: String,
            required: true,
        },
        dob: {
            type: String,
            required: true
        }
    },
    { timestamps: true, strict: false, autoIndex: true }
);

module.exports = mongoose.model("Author", authorSchema);