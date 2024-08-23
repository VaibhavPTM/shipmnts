const express = require("express");
const { listAuthors, addAuthors } = require("../controllers/author");
const fileHelper = require("../utilities/multerFunction");
const router = express.Router();

router.get("/authors", listAuthors);

router.post("/authors", fileHelper.memoryUpload.single("file"), addAuthors);

module.exports = router;