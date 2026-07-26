const db = require("../config/db");

// ==========================================
// Get All Purchases
// ==========================================
const getPurchases = (req, res) => {

  const sql = `
    SELECT
      purchases.*,
      products.name AS product_name,
      suppliers.supplier_name
    FROM purchases
    JOIN products
      ON purchases.product_id = products.id
    JOIN suppliers
      ON purchases.supplier_id = suppliers.id
    ORDER BY purchases.id DESC
  `;

  db.query(sql, (err, result) => {

    if (err) {
      return res.status(500).json(err);
    }

    res.json(result);

  });

};

// ==========================================
// Get Single Purchase
// ==========================================
const getPurchase = (req, res) => {

  db.query(
    "SELECT * FROM purchases WHERE id=?",
    [req.params.id],
    (err, result) => {

      if (err) {
        return res.status(500).json(err);
      }

      if (result.length === 0) {
        return res.status(404).json({
          message: "Purchase Not Found",
        });
      }

      res.json(result[0]);

    }
  );

};
// ==========================================
// Add Purchase
// ==========================================
const addPurchase = (req, res) => {

  const {
    product_id,
    supplier_id,
    quantity,
    buying_price,
    purchase_date,
    total,
  } = req.body;

  const sql = `
    INSERT INTO purchases
    (
      product_id,
      supplier_id,
      quantity,
      buying_price,
      purchase_date,
      total
    )
    VALUES (?,?,?,?,?,?)
  `;

  db.query(
    sql,
    [
      product_id,
      supplier_id,
      quantity,
      buying_price,
      purchase_date,
      total,
    ],
    (err, result) => {

      if (err) {
        return res.status(500).json(err);
      }

      // ==================================
      // Increase Product Stock
      // ==================================

      db.query(
        `
        UPDATE products
        SET stock = stock + ?
        WHERE id = ?
        `,
        [
          quantity,
          product_id,
        ],
        (err2) => {

          if (err2) {
            return res.status(500).json(err2);
          }

          res.json({
            message: "Purchase Added Successfully",
            purchaseId: result.insertId,
          });

        }

      );

    }

  );

};
// ==========================================
// Update Purchase
// ==========================================
const updatePurchase = (req, res) => {

  const { id } = req.params;

  const {
    product_id,
    supplier_id,
    quantity,
    buying_price,
    purchase_date,
    total,
  } = req.body;

  // Get Previous Purchase
  db.query(
    "SELECT * FROM purchases WHERE id=?",
    [id],
    (err, result) => {

      if (err) {
        return res.status(500).json(err);
      }

      if (result.length === 0) {
        return res.status(404).json({
          message: "Purchase Not Found",
        });
      }

      const oldPurchase = result[0];

      // Remove Previous Stock
      db.query(
        "UPDATE products SET stock = stock - ? WHERE id=?",
        [
          oldPurchase.quantity,
          oldPurchase.product_id,
        ],
        (err2) => {

          if (err2) {
            return res.status(500).json(err2);
          }

          // Add New Stock
          db.query(
            "UPDATE products SET stock = stock + ? WHERE id=?",
            [
              quantity,
              product_id,
            ],
            (err3) => {

              if (err3) {
                return res.status(500).json(err3);
              }

              // Update Purchase Record
              const sql = `
                UPDATE purchases
                SET
                  product_id=?,
                  supplier_id=?,
                  quantity=?,
                  buying_price=?,
                  purchase_date=?,
                  total=?
                WHERE id=?
              `;

              db.query(
                sql,
                [
                  product_id,
                  supplier_id,
                  quantity,
                  buying_price,
                  purchase_date,
                  total,
                  id,
                ],
                (err4) => {

                  if (err4) {
                    return res.status(500).json(err4);
                  }

                  res.json({
                    message: "Purchase Updated Successfully",
                  });

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
// Delete Purchase
// ==========================================
const deletePurchase = (req, res) => {

  const id = req.params.id;

  db.query(
    "SELECT * FROM purchases WHERE id=?",
    [id],
    (err, result) => {

      if (err) {
        return res.status(500).json(err);
      }

      if (result.length === 0) {
        return res.status(404).json({
          message: "Purchase Not Found",
        });
      }

      const purchase = result[0];

      // Decrease Product Stock
      db.query(
        "UPDATE products SET stock = stock - ? WHERE id=?",
        [
          purchase.quantity,
          purchase.product_id,
        ],
        (err2) => {

          if (err2) {
            return res.status(500).json(err2);
          }

          // Delete Purchase
          db.query(
            "DELETE FROM purchases WHERE id=?",
            [id],
            (err3) => {

              if (err3) {
                return res.status(500).json(err3);
              }

              res.json({
                message: "Purchase Deleted Successfully",
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

  getPurchases,
  getPurchase,
  addPurchase,
  updatePurchase,
  deletePurchase,

};