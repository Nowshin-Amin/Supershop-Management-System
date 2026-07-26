const db = require("../config/db");

// Get All Suppliers
const getSuppliers = (req, res) => {
  db.query("SELECT * FROM suppliers", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};

// Get Single Supplier
const getSupplier = (req, res) => {
  const { id } = req.params;

  db.query(
    "SELECT * FROM suppliers WHERE id=?",
    [id],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result[0]);
    }
  );
};

// Add Supplier
const addSupplier = (req, res) => {
  const {
    supplier_name,
    phone,
    email,
    company,
    address,
  } = req.body;

  db.query(
    "INSERT INTO suppliers(supplier_name,phone,email,company,address) VALUES(?,?,?,?,?)",
    [supplier_name, phone, email, company, address],
    (err) => {
      if (err) return res.status(500).json(err);

      res.json({
        message: "Supplier Added Successfully",
      });
    }
  );
};

// Update Supplier
const updateSupplier = (req, res) => {
  const { id } = req.params;

  const {
    supplier_name,
    phone,
    email,
    company,
    address,
  } = req.body;

  db.query(
    "UPDATE suppliers SET supplier_name=?, phone=?, email=?, company=?, address=? WHERE id=?",
    [supplier_name, phone, email, company, address, id],
    (err) => {
      if (err) return res.status(500).json(err);

      res.json({
        message: "Supplier Updated Successfully",
      });
    }
  );
};

// Delete Supplier
const deleteSupplier = (req, res) => {
  const { id } = req.params;

  db.query(
    "DELETE FROM suppliers WHERE id=?",
    [id],
    (err) => {
      if (err) return res.status(500).json(err);

      res.json({
        message: "Supplier Deleted Successfully",
      });
    }
  );
};

module.exports = {
  getSuppliers,
  getSupplier,
  addSupplier,
  updateSupplier,
  deleteSupplier,
};