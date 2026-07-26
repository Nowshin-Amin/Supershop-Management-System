const express = require("express");

const router = express.Router();

const {
  dashboardReport,
  lowStockProducts,
  recentSales,
  recentPurchases,
  monthlySales,
} = require("../controllers/reportController");

// Dashboard Statistics
router.get("/", dashboardReport);

// Low Stock Products
router.get("/low-stock", lowStockProducts);

// Recent Sales
router.get("/recent-sales", recentSales);

// Recent Purchases
router.get("/recent-purchases", recentPurchases);

// Monthly Sales
router.get("/monthly-sales", monthlySales);

module.exports = router;