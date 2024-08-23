const express = require("express");
const { listBooks, addBooks } = require("../controllers/book");
const fileHelper = require("../utilities/multerFunction");
const router = express.Router();

router.get("/books", listBooks);

router.post("/books", fileHelper.memoryUpload.single("file"), addBooks);

module.exports = router;