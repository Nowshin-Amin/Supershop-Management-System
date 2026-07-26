const express = require("express");

const router = express.Router();

const {

    getCustomers,

    getCustomer,

    addCustomer,

    updateCustomer,

    deleteCustomer

} = require("../controllers/customerController");

router.get("/", getCustomers);

router.get("/:id", getCustomer);

router.post("/", addCustomer);

router.put("/:id", updateCustomer);

router.delete("/:id", deleteCustomer);

module.exports = router;