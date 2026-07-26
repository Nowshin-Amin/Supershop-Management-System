const db = require("../config/db");

// Get All Categories
const getCategories = (req, res) => {
  db.query("SELECT * FROM categories", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};

// Get Single Category
const getCategory = (req, res) => {
  const { id } = req.params;

  db.query(
    "SELECT * FROM categories WHERE id=?",
    [id],
    (err, result) => {
      if (err) return res.status(500).json(err);

      res.json(result[0]);
    }
  );
};

// Add Category
const addCategory = (req, res) => {
  const { category_name } = req.body;

  db.query(
    "INSERT INTO categories(category_name) VALUES(?)",
    [category_name],
    (err) => {
      if (err) return res.status(500).json(err);

      res.json({
        message: "Category Added Successfully",
      });
    }
  );
};

// Update Category
const updateCategory = (req, res) => {
  const { id } = req.params;
  const { category_name } = req.body;

  db.query(
    "UPDATE categories SET category_name=? WHERE id=?",
    [category_name, id],
    (err) => {
      if (err) return res.status(500).json(err);

      res.json({
        message: "Category Updated Successfully",
      });
    }
  );
};

// Delete Category
const deleteCategory = (req, res) => {
  const { id } = req.params;

  db.query(
    "DELETE FROM categories WHERE id=?",
    [id],
    (err) => {
      if (err) return res.status(500).json(err);

      res.json({
        message: "Category Deleted Successfully",
      });
    }
  );
};

module.exports = {
  getCategories,
  getCategory,
  addCategory,
  updateCategory,
  deleteCategory,
};