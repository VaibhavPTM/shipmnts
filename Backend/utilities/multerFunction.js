const multer = require("multer");
const path = require("path");
const memoryStorage = multer.memoryStorage();

const memoryUpload = multer({ storage: memoryStorage });

module.exports = { memoryUpload };