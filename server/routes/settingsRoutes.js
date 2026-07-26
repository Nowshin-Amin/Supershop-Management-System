const express = require("express");

const router = express.Router();

const upload = require("../middleware/upload");

const {
  getSettings,
  updateSettings,
} = require("../controllers/settingsController");

// Get Settings
router.get("/", getSettings);

// Update Settings
router.put(
  "/",
  upload.single("logo"),
  updateSettings
);

module.exports = router;