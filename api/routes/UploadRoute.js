const express = require("express");
const multer = require("multer");
const path = require("path");

const router = express.Router();

// Setup multer to save files in /upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../../upload")); // <-- saves to server/upload
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + "_" + file.originalname;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

// POST /api/upload
router.post("/upload", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }
  res.json({
    filename: req.file.filename,
    path: `/uploads/${req.file.filename}`, // path accessible from frontend
  });
});

module.exports = router;
