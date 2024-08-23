const mongoose = require("mongoose");
const responseManager = require("../utilities/responseManager");
const XLSX = require('xlsx');
const Book = require("../models/book");
const Author = require("../models/author");

exports.addBooks = async (req, res) => {
    // Ensure file is uploaded
    if (!req.file || !req.file.buffer) {
        return responseManager.onError("No file uploaded", res);
    }

    try {
        // Read the Excel file from buffer
        const workbook = XLSX.read(req.file.buffer, { type: 'buffer' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];

        // Convert sheet to JSON
        const data = XLSX.utils.sheet_to_json(worksheet);

        // Process data and validate ObjectId
        const books = data.map(row => {
            // Validate and format ObjectId
            const authorid = mongoose.Types.ObjectId.isValid(row.authorid) ? new mongoose.Types.ObjectId(row.authorid) : null;
            return {
                authorid: authorid,
                name: row.name || "",
                isbn_code: row.isbn_code || ""
            };
        });

        // Insert data into MongoDB
        const bookData = await Book.insertMany(books);

        // Respond with success
        return responseManager.onSuccess("Books added successfully", bookData, res);
    } catch (error) {
        console.error("Error processing file:", error);
        return responseManager.onError("Error processing file", res);
    }
};

exports.listBooks = async (req, res) => {
    return Book.find()
        .sort({ _id: -1 })
        .select("-createdAt -updatedAt -__v")
        .populate([
            {
                path: "authorid",
                model: Author,
                select: "name dob",
            },
        ])
        .lean()
        .then((bookList) => {
            return responseManager.onSuccess(
                "Book list",
                bookList,
                res
            );
        })
        .catch((error) => {
            return responseManager.onError(error, res);
        });
};