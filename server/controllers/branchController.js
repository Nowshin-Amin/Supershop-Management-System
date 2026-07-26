const db = require("../config/db");

// ==========================
// Get All Branches
// ==========================
const getBranches = (req, res) => {

  db.query(
    "SELECT * FROM branches ORDER BY id DESC",
    (err, result) => {

      if (err) {
        return res.status(500).json(err);
      }

      res.json(result);

    }
  );

};

// ==========================
// Get Single Branch
// ==========================
const getBranch = (req, res) => {

  db.query(
    "SELECT * FROM branches WHERE id=?",
    [req.params.id],
    (err, result) => {

      if (err) {
        return res.status(500).json(err);
      }

      res.json(result[0]);

    }
  );

};

// ==========================
// Add Branch
// ==========================
const addBranch = (req, res) => {

  const {
    branch_name,
    manager_name,
    phone,
    email,
    address,
    status,
  } = req.body;

  const sql = `
    INSERT INTO branches
    (branch_name,manager_name,phone,email,address,status)
    VALUES (?,?,?,?,?,?)
  `;

  db.query(
    sql,
    [
      branch_name,
      manager_name,
      phone,
      email,
      address,
      status,
    ],
    (err) => {

      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        message: "Branch Added Successfully",
      });

    }
  );

};

// ==========================
// Update Branch
// ==========================
const updateBranch = (req, res) => {

  const {
    branch_name,
    manager_name,
    phone,
    email,
    address,
    status,
  } = req.body;

  const sql = `
    UPDATE branches
    SET
      branch_name=?,
      manager_name=?,
      phone=?,
      email=?,
      address=?,
      status=?
    WHERE id=?
  `;

  db.query(
    sql,
    [
      branch_name,
      manager_name,
      phone,
      email,
      address,
      status,
      req.params.id,
    ],
    (err) => {

      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        message: "Branch Updated Successfully",
      });

    }
  );

};

// ==========================
// Delete Branch
// ==========================
const deleteBranch = (req, res) => {

  db.query(
    "DELETE FROM branches WHERE id=?",
    [req.params.id],
    (err) => {

      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        message: "Branch Deleted Successfully",
      });

    }
  );

};

module.exports = {
  getBranches,
  getBranch,
  addBranch,
  updateBranch,
  deleteBranch,
};