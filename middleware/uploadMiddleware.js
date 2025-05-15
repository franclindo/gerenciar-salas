const multer = require("multer");

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
        cb(null, true);
    } else {
        cb(new Error("Apenas imagens são permitidas."), false);
    }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
