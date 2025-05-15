const express = require("express");
const router = express.Router();

const { createLab, getLabs, getLabsReport } = require("../controllers/labController");
const { protect } = require("../middleware/authMiddleware");
const weekdayMiddleware = require("../middleware/weekdayMiddleware");
const upload = require("../middleware/uploadMiddleware");

router.post("/novo", protect, weekdayMiddleware, upload.single("foto"), createLab);
router.get("/", getLabs);
router.get("/relatorio", protect, weekdayMiddleware, getLabsReport);

module.exports = router;
