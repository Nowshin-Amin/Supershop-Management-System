const db = require("../config/db");

// Get All Customers
const getCustomers = (req, res) => {

    db.query("SELECT * FROM customers", (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json(result);

    });

};

// Get Single Customer
const getCustomer = (req, res) => {

    const { id } = req.params;

    db.query(
        "SELECT * FROM customers WHERE id=?",
        [id],
        (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json(result[0]);

        }
    );

};

// Add Customer
const addCustomer = (req, res) => {

    const { name, phone, email, address } = req.body;

    db.query(
        "INSERT INTO customers(name,phone,email,address) VALUES(?,?,?,?)",
        [name, phone, email, address],
        (err) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json({
                message: "Customer Added Successfully"
            });

        }
    );

};

// Update Customer
const updateCustomer = (req, res) => {

    const { id } = req.params;

    const { name, phone, email, address } = req.body;

    db.query(
        "UPDATE customers SET name=?, phone=?, email=?, address=? WHERE id=?",
        [name, phone, email, address, id],
        (err) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json({
                message: "Customer Updated Successfully"
            });

        }
    );

};

// Delete Customer
const deleteCustomer = (req, res) => {

    const { id } = req.params;

    db.query(
        "DELETE FROM customers WHERE id=?",
        [id],
        (err) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json({
                message: "Customer Deleted Successfully"
            });

        }
    );

};

module.exports = {

    getCustomers,

    getCustomer,

    addCustomer,

    updateCustomer,

    deleteCustomer

};