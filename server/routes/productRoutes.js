const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");

const {
  getProducts,
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

// Get All Products
router.get("/", getProducts);

// Get Single Product
router.get("/:id", getProduct);

// Add Product with Image
router.post(
  "/",
  upload.single("image"),
  addProduct
);

// Update Product with Image
router.put(
  "/:id",
  upload.single("image"),
  updateProduct
);

// Delete Product
router.delete("/:id", deleteProduct);

module.exports = router;