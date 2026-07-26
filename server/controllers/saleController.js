const db = require("../config/db");

// ==========================================
// Get All Sales
// ==========================================
const getSales = (req, res) => {

  const sql = `
    SELECT
      sales.*,
      customers.name AS customer_name,
      products.name AS product_name
    FROM sales
    JOIN customers
      ON sales.customer_id = customers.id
    JOIN products
      ON sales.product_id = products.id
    ORDER BY sales.id DESC
  `;

  db.query(sql, (err, result) => {

    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }

    res.json(result);

  });

};

// ==========================================
// Get Single Sale (Invoice)
// ==========================================
const getSale = (req, res) => {

  const sql = `
    SELECT
      sales.*,
      customers.name AS customer_name,
      customers.phone,
      customers.address,
      products.name AS product_name
    FROM sales
    JOIN customers
      ON sales.customer_id = customers.id
    JOIN products
      ON sales.product_id = products.id
    WHERE sales.id=?
  `;

  db.query(
    sql,
    [req.params.id],
    (err, result) => {

      if (err) {
        return res.status(500).json(err);
      }

      if (result.length === 0) {
        return res.status(404).json({
          message: "Sale Not Found",
        });
      }

      res.json(result[0]);

    }
  );

};
// ==========================================
// Add Sale (Payment Method + Stock Check)
// ==========================================
const addSale = (req, res) => {

  const {
    customer_id,
    product_id,
    quantity,
    selling_price,
    total,
    sale_date,
    invoice_no,
    payment_method,
  } = req.body;

  // Check Product Stock
  db.query(
    "SELECT stock FROM products WHERE id=?",
    [product_id],
    (err, result) => {

      if (err) {
        return res.status(500).json(err);
      }

      if (result.length === 0) {
        return res.status(404).json({
          message: "Product Not Found",
        });
      }

      const currentStock = result[0].stock;

      if (Number(quantity) > Number(currentStock)) {

        return res.status(400).json({
          message: "Insufficient Stock",
        });

      }

      // Insert Sale
      const sql = `
        INSERT INTO sales
        (
          customer_id,
          product_id,
          quantity,
          selling_price,
          total,
          sale_date,
          invoice_no,
          payment_method
        )
        VALUES (?,?,?,?,?,?,?,?)
      `;

      db.query(
        sql,
        [
          customer_id,
          product_id,
          quantity,
          selling_price,
          total,
          sale_date,
          invoice_no,
          payment_method,
        ],
        (err2, result2) => {

          if (err2) {
            return res.status(500).json(err2);
          }

          // Reduce Product Stock
          db.query(
            "UPDATE products SET stock = stock - ? WHERE id=?",
            [quantity, product_id],
            (err3) => {

              if (err3) {
                return res.status(500).json(err3);
              }

              res.json({
                message: "Sale Added Successfully",
                saleId: result2.insertId,
              });

            }
          );

        }
      );

    }
  );

};
// ==========================================
// Update Sale (Final)
// ==========================================
const updateSale = (req, res) => {

  const id = req.params.id;

  const {
    customer_id,
    product_id,
    quantity,
    selling_price,
    total,
    sale_date,
    invoice_no,
    payment_method,
  } = req.body;

  // Find Old Sale
  db.query(
    "SELECT * FROM sales WHERE id=?",
    [id],
    (err, result) => {

      if (err) {
        return res.status(500).json(err);
      }

      if (result.length === 0) {
        return res.status(404).json({
          message: "Sale Not Found",
        });
      }

      const oldSale = result[0];

      // Check Current Stock
      db.query(
        "SELECT stock FROM products WHERE id=?",
        [product_id],
        (err2, stockResult) => {

          if (err2) {
            return res.status(500).json(err2);
          }

          const availableStock =
            Number(stockResult[0].stock) +
            (oldSale.product_id == product_id
              ? Number(oldSale.quantity)
              : 0);

          if (Number(quantity) > availableStock) {

            return res.status(400).json({
              message: "Insufficient Stock",
            });

          }

          // Restore Old Stock
          db.query(
            "UPDATE products SET stock = stock + ? WHERE id=?",
            [oldSale.quantity, oldSale.product_id],
            (err3) => {

              if (err3) {
                return res.status(500).json(err3);
              }

              // Reduce New Stock
              db.query(
                "UPDATE products SET stock = stock - ? WHERE id=?",
                [quantity, product_id],
                (err4) => {

                  if (err4) {
                    return res.status(500).json(err4);
                  }

                  const sql = `
                    UPDATE sales
                    SET
                      customer_id=?,
                      product_id=?,
                      quantity=?,
                      selling_price=?,
                      total=?,
                      sale_date=?,
                      invoice_no=?,
                      payment_method=?
                    WHERE id=?
                  `;

                  db.query(
                    sql,
                    [
                      customer_id,
                      product_id,
                      quantity,
                      selling_price,
                      total,
                      sale_date,
                      invoice_no,
                      payment_method,
                      id,
                    ],
                    (err5) => {

                      if (err5) {
                        return res.status(500).json(err5);
                      }

                      res.json({
                        message: "Sale Updated Successfully",
                      });

                    }
                  );

                }
              );

            }
          );

        }
      );

    }
  );

};
// ==========================================
// Delete Sale (Final)
// ==========================================
const deleteSale = (req, res) => {

  const id = req.params.id;

  db.query(
    "SELECT * FROM sales WHERE id=?",
    [id],
    (err, result) => {

      if (err) {
        return res.status(500).json(err);
      }

      if (result.length === 0) {
        return res.status(404).json({
          message: "Sale Not Found",
        });
      }

      const sale = result[0];

      // Restore Product Stock
      db.query(
        "UPDATE products SET stock = stock + ? WHERE id=?",
        [
          sale.quantity,
          sale.product_id,
        ],
        (err2) => {

          if (err2) {
            return res.status(500).json(err2);
          }

          // Delete Sale
          db.query(
            "DELETE FROM sales WHERE id=?",
            [id],
            (err3) => {

              if (err3) {
                return res.status(500).json(err3);
              }

              res.json({
                message: "Sale Deleted Successfully",
              });

            }
          );

        }
      );

    }
  );

};

// ==========================================
// Export
// ==========================================
module.exports = {
  getSales,
  getSale,
  addSale,
  updateSale,
  deleteSale,
};