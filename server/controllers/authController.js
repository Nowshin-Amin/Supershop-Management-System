const db = require("../config/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const login = (req, res) => {

  const { email, password } = req.body;

  db.query(
    "SELECT * FROM users WHERE email=?",
    [email],
    async (err, result) => {

      if (err) {
        return res.status(500).json(err);
      }

      if (result.length === 0) {
        return res.status(401).json({
          message: "Email not found",
        });
      }

      const user = result[0];

      // Inactive User
      if (user.status === "Inactive") {
        return res.status(403).json({
          message: "Your account is inactive",
        });
      }

      let passwordMatch = false;

      // Old Plain Password Support
      if (password === user.password) {
        passwordMatch = true;
      } else {
        try {
          passwordMatch = await bcrypt.compare(
            password,
            user.password
          );
        } catch {
          passwordMatch = false;
        }
      }

      if (!passwordMatch) {
        return res.status(401).json({
          message: "Incorrect Password",
        });
      }

      const token = jwt.sign(
        {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "1d",
        }
      );

      res.json({

        success: true,

        message: "Login Successful",

        token,

        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          status: user.status,
        },

      });

    }
  );

};

module.exports = {
  login,
};