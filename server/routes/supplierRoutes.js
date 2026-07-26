const express = require("express");

const router = express.Router();

const {
  getSuppliers,
  getSupplier,
  addSupplier,
  updateSupplier,
  deleteSupplier,
} = require("../controllers/supplierController");

router.get("/", getSuppliers);

router.get("/:id", getSupplier);

router.post("/", addSupplier);

router.put("/:id", updateSupplier);

router.delete("/:id", deleteSupplier);

module.exports = router;