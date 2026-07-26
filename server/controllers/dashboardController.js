const db = require("../config/db");

const getDashboard = (req, res) => {

  const sql = `
  SELECT
  (SELECT COUNT(*) FROM products) AS products,
  (SELECT COUNT(*) FROM categories) AS categories,
  (SELECT COUNT(*) FROM customers) AS customers,
  (SELECT COUNT(*) FROM suppliers) AS suppliers,
  (SELECT COUNT(*) FROM users) AS users,
  (SELECT COUNT(*) FROM purchases) AS purchases,
  (SELECT COUNT(*) FROM sales) AS sales
  `;

  db.query(sql, (err, result) => {

    if (err) {
      return res.status(500).json(err);
    }

    res.json(result[0]);

  });

};

module.exports = {
  getDashboard,
};