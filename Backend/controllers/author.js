const mongoose = require("mongoose");
const XLSX = require('xlsx');
const Author = require("../models/author");
const responseManager = require("../utilities/responseManager");

exports.addAuthors = async (req, res) => {

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

        // Process data and insert into MongoDB
        const authors = data.map(row => ({
            name: row.name || "",
            email: row.email || "",
            dob: row.dob ? new Date(row.dob) : null // Convert to Date object
        }));

        const authorData = await Author.insertMany(authors);

        // Respond with success
        return responseManager.onSuccess("Authors added successfully", authorData, res);
    } catch (error) {
        console.error("Error processing file:", error);
        return responseManager.onError("Error processing file", res);
    }
};

exports.listAuthors = async (req, res) => {

    return Author.find()
        .sort({ _id: -1 })
        .select("-createdAt -updatedAt -__v")
        .lean()
        .then((authorList) => {
            return responseManager.onSuccess(
                "Author list",
                authorList,
                res
            );
        })
        .catch((error) => {
            return responseManager.onError(error, res);
        });
};