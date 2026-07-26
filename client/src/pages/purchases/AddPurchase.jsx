import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getProducts } from "../../api/productApi";
import { getSuppliers } from "../../api/supplierApi";
import { addPurchase } from "../../api/purchaseApi";

function AddPurchase() {

  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [suppliers, setSuppliers] = useState([]);

  const [purchase, setPurchase] = useState({
    product_id: "",
    supplier_id: "",
    quantity: "",
    buying_price: "",
    purchase_date: "",
    total: 0,
  });

  useEffect(() => {

    loadProducts();

    loadSuppliers();

  }, []);

  const loadProducts = async () => {

    const res = await getProducts();

    setProducts(res.data);

  };

  const loadSuppliers = async () => {

    const res = await getSuppliers();

    setSuppliers(res.data);

  };

  const handleChange = (e) => {

    const data = {
      ...purchase,
      [e.target.name]: e.target.value,
    };

    data.total =
      Number(data.quantity || 0) *
      Number(data.buying_price || 0);

    setPurchase(data);

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    await addPurchase(purchase);

    alert("Purchase Added Successfully");

    navigate("/purchases");

  };

  return (

    <div className="container mt-4">

      <div className="card">

        <div className="card-header bg-success text-white">

          <h3>Add Purchase</h3>

        </div>

        <div className="card-body">

          <form onSubmit={handleSubmit}>

            <div className="mb-3">

              <label>Product</label>

              <select
                className="form-control"
                name="product_id"
                value={purchase.product_id}
                onChange={handleChange}
                required
              >

                <option value="">Select Product</option>

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

              <label>Supplier</label>

              <select
                className="form-control"
                name="supplier_id"
                value={purchase.supplier_id}
                onChange={handleChange}
                required
              >

                <option value="">Select Supplier</option>

                {suppliers.map((item) => (

                  <option
                    key={item.id}
                    value={item.id}
                  >

                    {item.supplier_name}

                  </option>

                ))}

              </select>

            </div>

            <div className="mb-3">

              <label>Quantity</label>

              <input
                type="number"
                className="form-control"
                name="quantity"
                value={purchase.quantity}
                onChange={handleChange}
                required
              />

            </div>

            <div className="mb-3">

              <label>Buying Price</label>

              <input
                type="number"
                className="form-control"
                name="buying_price"
                value={purchase.buying_price}
                onChange={handleChange}
                required
              />

            </div>

            <div className="mb-3">

              <label>Purchase Date</label>

              <input
                type="date"
                className="form-control"
                name="purchase_date"
                value={purchase.purchase_date}
                onChange={handleChange}
                required
              />

            </div>

            <div className="mb-3">

              <label>Total</label>

              <input
                className="form-control"
                value={purchase.total}
                readOnly
              />

            </div>

            <button className="btn btn-success">

              Save Purchase

            </button>

          </form>

        </div>

      </div>

    </div>

  );

}

export default AddPurchase;