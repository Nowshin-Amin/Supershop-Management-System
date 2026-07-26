const db = require("../config/db");
const bcrypt = require("bcrypt");

// ======================
// Get All Users
// ======================

const getUsers = (req, res) => {

  db.query(
    "SELECT id,name,email,role,status FROM users ORDER BY id DESC",
    (err, result) => {

      if (err) {
        return res.status(500).json(err);
      }

      res.json(result);

    }
  );

};

// ======================
// Get Single User
// ======================

const getUser = (req, res) => {

  db.query(
    "SELECT id,name,email,role,status FROM users WHERE id=?",
    [req.params.id],
    (err, result) => {

      if (err) {
        return res.status(500).json(err);
      }

      res.json(result[0]);

    }
  );

};

// ======================
// Add User
// ======================

const addUser = async (req, res) => {

  const {
    name,
    email,
    password,
    role,
    status,
  } = req.body;

  try {

    db.query(
      "SELECT * FROM users WHERE email=?",
      [email],
      async (err, result) => {

        if (err) {
          return res.status(500).json(err);
        }

        if (result.length > 0) {
          return res.status(400).json({
            message: "Email Already Exists",
          });
        }

        const hash = await bcrypt.hash(password, 10);

        db.query(
          `INSERT INTO users
          (name,email,password,role,status)
          VALUES(?,?,?,?,?)`,
          [
            name,
            email,
            hash,
            role,
            status,
          ],
          (err2) => {

            if (err2) {
              return res.status(500).json(err2);
            }

            res.json({
              message: "User Added Successfully",
            });

          }
        );

      }
    );

  } catch {

    res.status(500).json({
      message: "Server Error",
    });

  }

};

// ======================
// Update User
// ======================

const updateUser = async (req, res) => {

  const {
    name,
    email,
    password,
    role,
    status,
  } = req.body;

  try {

    if (password && password.trim() !== "") {

      const hash = await bcrypt.hash(password, 10);

      db.query(
        `UPDATE users
        SET
        name=?,
        email=?,
        password=?,
        role=?,
        status=?
        WHERE id=?`,
        [
          name,
          email,
          hash,
          role,
          status,
          req.params.id,
        ],
        (err) => {

          if (err) {
            return res.status(500).json(err);
          }

          res.json({
            message: "User Updated Successfully",
          });

        }
      );

    } else {

      db.query(
        `UPDATE users
        SET
        name=?,
        email=?,
        role=?,
        status=?
        WHERE id=?`,
        [
          name,
          email,
          role,
          status,
          req.params.id,
        ],
        (err) => {

          if (err) {
            return res.status(500).json(err);
          }

          res.json({
            message: "User Updated Successfully",
          });

        }
      );

    }

  } catch {

    res.status(500).json({
      message: "Server Error",
    });

  }

};

// ======================
// Delete User
// ======================

const deleteUser = (req, res) => {

  db.query(
    "DELETE FROM users WHERE id=?",
    [req.params.id],
    (err) => {

      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        message: "User Deleted Successfully",
      });

    }
  );

};

module.exports = {
  getUsers,
  getUser,
  addUser,
  updateUser,
  deleteUser,
};