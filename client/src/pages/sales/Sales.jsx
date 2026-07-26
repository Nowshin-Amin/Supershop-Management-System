import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  getSales,
  deleteSale,
} from "../../api/saleApi";

function Sales() {

  const [sales, setSales] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadSales();
  }, []);

  const loadSales = async () => {

    try {

      const res = await getSales();

      setSales(res.data);

    } catch (err) {

      console.log(err);

    }

  };

  const handleDelete = async (id) => {

    if (window.confirm("Delete this sale?")) {

      try {

        await deleteSale(id);

        alert("Sale Deleted Successfully");

        loadSales();

      } catch (err) {

        console.log(err);

        alert("Delete Failed");

      }

    }

  };

  const filteredSales = sales.filter((item) =>
    item.product_name
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (

    <div className="container mt-4">

      <div className="d-flex justify-content-between mb-3">

        <h2>Sales Management</h2>

        <Link
          to="/sales/add"
          className="btn btn-success"
        >
          Add Sale
        </Link>

      </div>

      <input
        className="form-control mb-3"
        placeholder="Search Product..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <table className="table table-bordered table-hover">

        <thead className="table-dark">

          <tr>

            <th>ID</th>

            <th>Invoice</th>

            <th>Customer</th>

            <th>Product</th>

            <th>Qty</th>

            <th>Price</th>

            <th>Total</th>

            <th>Date</th>

            <th width="300">Action</th>

          </tr>

        </thead>

        <tbody>

          {filteredSales.map((sale) => (

            <tr key={sale.id}>

              <td>{sale.id}</td>

              <td>{sale.invoice_no}</td>

              <td>{sale.customer_name}</td>

              <td>{sale.product_name}</td>

              <td>{sale.quantity}</td>

              <td>{sale.selling_price}</td>

              <td>{sale.total}</td>

              <td>{sale.sale_date}</td>

              <td>

                <Link
                  to={`/sales/edit/${sale.id}`}
                  className="btn btn-primary btn-sm me-2"
                >
                  Edit
                </Link>

                <button
                  className="btn btn-danger btn-sm me-2"
                  onClick={() => handleDelete(sale.id)}
                >
                  Delete
                </button>

                <Link
                  to={`/invoice/${sale.id}`}
                  className="btn btn-success btn-sm"
                >
                  Print Invoice
                </Link>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

}

export default Sales;