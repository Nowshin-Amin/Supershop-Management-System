const db = require("../config/db");

// ==========================================
// Dashboard Report
// ==========================================
const dashboardReport = (req, res) => {

  const sql = `
    SELECT
      (SELECT COUNT(*) FROM products) AS totalProducts,
      (SELECT COUNT(*) FROM customers) AS totalCustomers,
      (SELECT COUNT(*) FROM suppliers) AS totalSuppliers,
      (SELECT COUNT(*) FROM purchases) AS totalPurchases,
      (SELECT COUNT(*) FROM sales) AS totalSales,
      (SELECT IFNULL(SUM(total),0) FROM purchases) AS purchaseAmount,
      (SELECT IFNULL(SUM(total),0) FROM sales) AS salesAmount
  `;

  db.query(sql, (err, result) => {

    if (err) {
      return res.status(500).json(err);
    }

    const data = result[0];

    data.profit =
      Number(data.salesAmount) -
      Number(data.purchaseAmount);

    res.json(data);

  });

};

// ==========================================
// Low Stock Products
// ==========================================
const lowStockProducts = (req, res) => {

  const sql = `
    SELECT
      id,
      name,
      stock,
      price
    FROM products
    WHERE stock <= 5
    ORDER BY stock ASC
  `;

  db.query(sql, (err, result) => {

    if (err) {
      return res.status(500).json(err);
    }

    res.json(result);

  });

};

// ==========================================
// Recent Sales
// ==========================================
const recentSales = (req, res) => {

  const sql = `
    SELECT
      sales.id,
      sales.invoice_no,
      sales.total,
      sales.sale_date,
      customers.name AS customer_name,
      products.name AS product_name
    FROM sales
    JOIN customers
      ON sales.customer_id = customers.id
    JOIN products
      ON sales.product_id = products.id
    ORDER BY sales.id DESC
    LIMIT 5
  `;

  db.query(sql, (err, result) => {

    if (err) {
      return res.status(500).json(err);
    }

    res.json(result);

  });

};

// ==========================================
// Recent Purchases
// ==========================================
const recentPurchases = (req, res) => {

  const sql = `
    SELECT
      purchases.id,
      purchases.total,
      purchases.purchase_date,
      suppliers.supplier_name
    FROM purchases
    JOIN suppliers
      ON purchases.supplier_id = suppliers.id
    ORDER BY purchases.id DESC
    LIMIT 5
  `;

  db.query(sql, (err, result) => {

    if (err) {
      return res.status(500).json(err);
    }

    res.json(result);

  });

};

// ==========================================
// Monthly Sales
// ==========================================
const monthlySales = (req, res) => {

  const sql = `
    SELECT
      MONTH(sale_date) AS month_no,
      MONTHNAME(sale_date) AS month,
      SUM(total) AS total
    FROM sales
    GROUP BY MONTH(sale_date), MONTHNAME(sale_date)
    ORDER BY month_no
  `;

  db.query(sql, (err, result) => {

    if (err) {
      return res.status(500).json(err);
    }

    res.json(result);

  });

};

// ==========================================
// Export
// ==========================================
module.exports = {
  dashboardReport,
  lowStockProducts,
  recentSales,
  recentPurchases,
  monthlySales,
};