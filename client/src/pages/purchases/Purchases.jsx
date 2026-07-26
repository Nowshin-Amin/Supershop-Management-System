import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getPurchases,
  deletePurchase,
} from "../../api/purchaseApi";

function Purchases() {

  const [purchases, setPurchases] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadPurchases();
  }, []);

  const loadPurchases = async () => {

    const res = await getPurchases();

    setPurchases(res.data);

  };

  const handleDelete = async (id) => {

    if (window.confirm("Delete this purchase?")) {

      await deletePurchase(id);

      alert("Purchase Deleted Successfully");

      loadPurchases();

    }

  };

  const filtered = purchases.filter((item) =>
    item.product_name
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (

    <div className="container mt-4">

      <div className="d-flex justify-content-between mb-3">

        <h2>Purchase Management</h2>

        <Link
          className="btn btn-success"
          to="/purchases/add"
        >
          Add Purchase
        </Link>

      </div>

      <input
        className="form-control mb-3"
        placeholder="Search Product..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
      />

      <table className="table table-bordered table-hover">

        <thead className="table-dark">

          <tr>

            <th>ID</th>

            <th>Product</th>

            <th>Supplier</th>

            <th>Qty</th>

            <th>Buying Price</th>

            <th>Total</th>

            <th>Date</th>

            <th width="220">Action</th>

          </tr>

        </thead>

        <tbody>

          {filtered.map((item) => (

            <tr key={item.id}>

              <td>{item.id}</td>

              <td>{item.product_name}</td>

              <td>{item.supplier_name}</td>

              <td>{item.quantity}</td>

              <td>{item.buying_price}</td>

              <td>{item.total}</td>

              <td>{item.purchase_date}</td>

              <td>

                <Link
                  className="btn btn-primary btn-sm me-2"
                  to={`/purchases/edit/${item.id}`}
                >
                  Edit
                </Link>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() =>
                    handleDelete(item.id)
                  }
                >
                  Delete
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

}

export default Purchases;