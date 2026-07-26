const express = require("express");

const router = express.Router();

const {
  getSales,
  getSale,
  addSale,
  updateSale,
  deleteSale,
} = require("../controllers/saleController");

// Get All Sales
router.get("/", getSales);

// Get Single Sale
router.get("/:id", getSale);

// Add Sale
router.post("/", addSale);

// Update Sale
router.put("/:id", updateSale);

// Delete Sale
router.delete("/:id", deleteSale);

module.exports = router;