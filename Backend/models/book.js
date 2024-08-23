const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
    {
        authorid: {
            type: mongoose.Types.ObjectId,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        isbn_code: {
            type: String,
            required: true
        }
    },
    { timestamps: true, strict: false, autoIndex: true }
);

module.exports = mongoose.model("Book", bookSchema);