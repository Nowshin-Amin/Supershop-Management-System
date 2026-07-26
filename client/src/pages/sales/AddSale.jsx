import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getProducts } from "../../api/productApi";
import { getCustomers } from "../../api/customerApi";
import { addSale } from "../../api/saleApi";

function AddSale() {

  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);

  const [sale, setSale] = useState({
    customer_id: "",
    product_id: "",
    quantity: "",
    selling_price: "",
    total: "",
    sale_date: "",
    invoice_no: "INV-" + Date.now(),
    payment_method: "Cash",
  });

  useEffect(() => {
    loadProducts();
    loadCustomers();
  }, []);

  const loadProducts = async () => {

    try {

      const res = await getProducts();

      setProducts(res.data);

    } catch (err) {

      console.log(err);

    }

  };

  const loadCustomers = async () => {

    try {

      const res = await getCustomers();

      setCustomers(res.data);

    } catch (err) {

      console.log(err);

    }

  };
  // ==========================================
// Product Change
// ==========================================
const handleProduct = (e) => {

  const id = e.target.value;

  const product = products.find(
    (p) => p.id == id
  );

  setSale({

    ...sale,

    product_id: id,

    selling_price: product ? product.price : "",

    total: product
      ? Number(product.price) *
        Number(sale.quantity || 0)
      : 0,

  });

};

// ==========================================
// Input Change
// ==========================================
const handleChange = (e) => {

  const data = {

    ...sale,

    [e.target.name]: e.target.value,

  };

  data.total =
    Number(data.quantity || 0) *
    Number(data.selling_price || 0);

  setSale(data);

};

// ==========================================
// Submit Sale
// ==========================================
const handleSubmit = async (e) => {

  e.preventDefault();

  try {

    await addSale(sale);

    alert("Sale Added Successfully");

    navigate("/sales");

  } catch (err) {

    console.log(err);

    alert(
      err.response?.data?.message ||
      "Failed to Add Sale"
    );

  }

};
return (

  <div className="container mt-4">

    <div className="card shadow">

      <div className="card-header bg-success text-white">

        <h3>Add Sale</h3>

      </div>

      <div className="card-body">

        <form onSubmit={handleSubmit}>

          {/* Customer */}

          <div className="mb-3">

            <label>Customer</label>

            <select
              className="form-control"
              name="customer_id"
              value={sale.customer_id}
              onChange={handleChange}
              required
            >

              <option value="">
                Select Customer
              </option>

              {customers.map((item) => (

                <option
                  key={item.id}
                  value={item.id}
                >
                  {item.name}
                </option>

              ))}

            </select>

          </div>

          {/* Product */}

          <div className="mb-3">

            <label>Product</label>

            <select
              className="form-control"
              value={sale.product_id}
              onChange={handleProduct}
              required
            >

              <option value="">
                Select Product
              </option>

              {products.map((item) => (

                <option
                  key={item.id}
                  value={item.id}
                >
                  {item.name} (Stock: {item.stock})
                </option>

              ))}

            </select>

          </div>

          {/* Selling Price */}

          <div className="mb-3">

            <label>Selling Price</label>

            <input
              className="form-control"
              name="selling_price"
              value={sale.selling_price}
              readOnly
            />

          </div>

          {/* Quantity */}

          <div className="mb-3">

            <label>Quantity</label>

            <input
              type="number"
              className="form-control"
              name="quantity"
              value={sale.quantity}
              onChange={handleChange}
              min="1"
              required
            />

          </div>

          {/* Total */}

          <div className="mb-3">

            <label>Total</label>

            <input
              className="form-control"
              value={sale.total}
              readOnly
            />

          </div>

          {/* Sale Date */}

          <div className="mb-3">

            <label>Sale Date</label>

            <input
              type="date"
              className="form-control"
              name="sale_date"
              value={sale.sale_date}
              onChange={handleChange}
              required
            />

          </div>

          {/* Invoice */}

          <div className="mb-3">

            <label>Invoice No</label>

            <input
              className="form-control"
              value={sale.invoice_no}
              readOnly
            />

          </div>

          {/* Payment Method */}

          <div className="mb-3">

            <label>Payment Method</label>

            <select
              className="form-control"
              name="payment_method"
              value={sale.payment_method}
              onChange={handleChange}
            >

              <option value="Cash">Cash</option>
              <option value="Card">Card</option>
              <option value="Bkash">Bkash</option>
              <option value="Nagad">Nagad</option>
              <option value="Rocket">Rocket</option>

            </select>

          </div>
                    <button
            type="submit"
            className="btn btn-success w-100"
          >
            Save Sale
          </button>

        </form>

      </div>

    </div>

  </div>

);

}

export default AddSale;