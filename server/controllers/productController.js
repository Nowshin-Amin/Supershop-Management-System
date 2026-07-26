const db = require("../config/db");

// ======================
// GET ALL PRODUCTS
// ======================

const getProducts = (req, res) => {

    const sql = "SELECT * FROM products";

    db.query(sql, (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json(result);

    });

};

// ======================
// GET SINGLE PRODUCT
// ======================

const getProduct = (req, res) => {

    db.query(

        "SELECT * FROM products WHERE id=?",

        [req.params.id],

        (err, result) => {

            if (err) return res.status(500).json(err);

            res.json(result[0]);

        }

    );

};

// ======================
// ADD PRODUCT
// ======================

const addProduct = (req, res) => {

    const {

        name,

        category,

        price,

        stock,

    } = req.body;

    const image = req.file ? req.file.filename : null;

    const sql = `

        INSERT INTO products

        (name,category,price,stock,image)

        VALUES (?,?,?,?,?)

    `;

    db.query(

        sql,

        [

            name,

            category,

            price,

            stock,

            image,

        ],

        (err) => {

            if (err) {

                return res.status(500).json(err);

            }

            res.json({

                message: "Product Added Successfully",

            });

        }

    );

};

// ======================
// UPDATE PRODUCT
// ======================

const updateProduct = (req, res) => {

    const id = req.params.id;

    const {

        name,

        category,

        price,

        stock,

    } = req.body;

    db.query(

        "SELECT * FROM products WHERE id=?",

        [id],

        (err, result) => {

            if (err) return res.status(500).json(err);

            const oldImage = result[0].image;

            const image = req.file ? req.file.filename : oldImage;

            const sql = `

                UPDATE products

                SET

                name=?,

                category=?,

                price=?,

                stock=?,

                image=?

                WHERE id=?

            `;

            db.query(

                sql,

                [

                    name,

                    category,

                    price,

                    stock,

                    image,

                    id,

                ],

                (err2) => {

                    if (err2)

                        return res.status(500).json(err2);

                    res.json({

                        message: "Product Updated Successfully",

                    });

                }

            );

        }

    );

};

// ======================
// DELETE PRODUCT
// ======================

const deleteProduct = (req, res) => {

    db.query(

        "DELETE FROM products WHERE id=?",

        [req.params.id],

        (err) => {

            if (err)

                return res.status(500).json(err);

            res.json({

                message: "Product Deleted Successfully",

            });

        }

    );

};

module.exports = {

    getProducts,

    getProduct,

    addProduct,

    updateProduct,

    deleteProduct,

};