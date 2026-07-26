const express = require("express");
const router = express.Router();

const {
  getBranches,
  getBranch,
  addBranch,
  updateBranch,
  deleteBranch,
} = require("../controllers/branchController");

// Get All Branches
router.get("/", getBranches);

// Get Single Branch
router.get("/:id", getBranch);

// Add Branch
router.post("/", addBranch);

// Update Branch
router.put("/:id", updateBranch);

// Delete Branch
router.delete("/:id", deleteBranch);

module.exports = router;