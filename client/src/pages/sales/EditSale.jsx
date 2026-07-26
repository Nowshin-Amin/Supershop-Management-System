import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getProducts } from "../../api/productApi";
import { getCustomers } from "../../api/customerApi";

import {
  getSale,
  updateSale,
} from "../../api/saleApi";

function EditSale() {

  const { id } = useParams();

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
    invoice_no: "",
  });

  useEffect(() => {

    loadProducts();
    loadCustomers();
    loadSale();

  }, []);

  const loadProducts = async () => {

    const res = await getProducts();

    setProducts(res.data);

  };

  const loadCustomers = async () => {

    const res = await getCustomers();

    setCustomers(res.data);

  };

  const loadSale = async () => {

    const res = await getSale(id);

    setSale({

      ...res.data,

      sale_date: res.data.sale_date
        ? res.data.sale_date.substring(0, 10)
        : "",

    });

  };

  const handleProduct = (e) => {

    const product = products.find(
      (p) => p.id == e.target.value
    );

    setSale({

      ...sale,

      product_id: e.target.value,

      selling_price: product.price,

      total:
        Number(product.price) *
        Number(sale.quantity),

    });

  };

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

  const handleSubmit = async (e) => {

    e.preventDefault();

    await updateSale(id, sale);

    alert("Sale Updated Successfully");

    navigate("/sales");

  };

  return (

    <div className="container mt-4">

      <div className="card">

        <div className="card-header bg-primary text-white">

          <h3>Edit Sale</h3>

        </div>

        <div className="card-body">

          <form onSubmit={handleSubmit}>

            <div className="mb-3">

              <label>Customer</label>

              <select
                className="form-control"
                name="customer_id"
                value={sale.customer_id}
                onChange={handleChange}
              >

                <option value="">
                  Select Customer
                </option>

                {customers.map((item) => (

                  <option
                    key={item.id}
                    value={item.id}
                  >
                    {item.customer_name}
                  </option>

                ))}

              </select>

            </div>

            <div className="mb-3">

              <label>Product</label>

              <select
                className="form-control"
                value={sale.product_id}
                onChange={handleProduct}
              >

                <option value="">
                  Select Product
                </option>

                {products.map((item) => (

                  <option
                    key={item.id}
                    value={item.id}
                  >
                    {item.name}
                  </option>

                ))}

              </select>

            </div>

            <div className="mb-3">

              <label>Selling Price</label>

              <input
                className="form-control"
                name="selling_price"
                value={sale.selling_price}
                readOnly
              />

            </div>

            <div className="mb-3">

              <label>Quantity</label>

              <input
                type="number"
                className="form-control"
                name="quantity"
                value={sale.quantity}
                onChange={handleChange}
              />

            </div>

            <div className="mb-3">

              <label>Total</label>

              <input
                className="form-control"
                value={sale.total}
                readOnly
              />

            </div>

            <div className="mb-3">

              <label>Sale Date</label>

              <input
                type="date"
                className="form-control"
                name="sale_date"
                value={sale.sale_date}
                onChange={handleChange}
              />

            </div>

            <div className="mb-3">

              <label>Invoice No</label>

              <input
                className="form-control"
                value={sale.invoice_no}
                readOnly
              />

            </div>

            <button className="btn btn-primary">

              Update Sale

            </button>

          </form>

        </div>

      </div>

    </div>

  );

}

export default EditSale;