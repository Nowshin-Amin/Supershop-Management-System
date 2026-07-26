const express = require("express");

const router = express.Router();

const {
  getPurchases,
  getPurchase,
  addPurchase,
  updatePurchase,
  deletePurchase,
} = require("../controllers/purchaseController");

// Get All Purchases
router.get("/", getPurchases);

// Get Single Purchase
router.get("/:id", getPurchase);

// Add Purchase
router.post("/", addPurchase);

// Update Purchase
router.put("/:id", updatePurchase);

// Delete Purchase
router.delete("/:id", deletePurchase);

module.exports = router;