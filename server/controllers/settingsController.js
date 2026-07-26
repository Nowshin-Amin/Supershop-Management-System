const db = require("../config/db");

// ===============================
// Get Settings
// ===============================
const getSettings = (req, res) => {

  db.query(
    "SELECT * FROM settings WHERE id = 1",
    (err, result) => {

      if (err) {
        return res.status(500).json(err);
      }

      if (result.length === 0) {
        return res.json({
          shop_name: "",
          owner_name: "",
          phone: "",
          email: "",
          address: "",
          currency: "BDT",
          tax: 0,
          logo: "",
        });
      }

      res.json(result[0]);

    }
  );

};

// ===============================
// Update Settings
// ===============================
const updateSettings = (req, res) => {

  const {
    shop_name,
    owner_name,
    phone,
    email,
    address,
    currency,
    tax,
  } = req.body;

  db.query(
    "SELECT * FROM settings WHERE id = 1",
    (err, result) => {

      if (err) {
        return res.status(500).json(err);
      }

      let logo = "";

      if (req.file) {
        logo = req.file.filename;
      } else {
        logo = result.length > 0 ? result[0].logo : "";
      }

      const sql = `
        UPDATE settings
        SET
          shop_name=?,
          owner_name=?,
          phone=?,
          email=?,
          address=?,
          currency=?,
          tax=?,
          logo=?
        WHERE id=1
      `;

      db.query(
        sql,
        [
          shop_name,
          owner_name,
          phone,
          email,
          address,
          currency,
          tax,
          logo,
        ],
        (err2) => {

          if (err2) {
            return res.status(500).json(err2);
          }

          res.json({
            success: true,
            message: "Settings Updated Successfully",
          });

        }
      );

    }
  );

};

module.exports = {
  getSettings,
  updateSettings,
};