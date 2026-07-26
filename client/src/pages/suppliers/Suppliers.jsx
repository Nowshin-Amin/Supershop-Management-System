import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getSuppliers,
  deleteSupplier,
} from "../../api/supplierApi";

function Suppliers() {
  const [suppliers, setSuppliers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadSuppliers();
  }, []);

  const loadSuppliers = async () => {
    try {
      const res = await getSuppliers();
      setSuppliers(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this supplier?")) return;

    try {
      await deleteSupplier(id);
      alert("Supplier Deleted Successfully");
      loadSuppliers();
    } catch (err) {
      console.log(err);
      alert("Delete Failed");
    }
  };

  const filtered = suppliers.filter((item) =>
    item.supplier_name
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="container mt-4">

      <div className="d-flex justify-content-between mb-3">

        <h2>Supplier Management</h2>

        <Link
          className="btn btn-success"
          to="/suppliers/add"
        >
          Add Supplier
        </Link>

      </div>

      <input
        className="form-control mb-3"
        placeholder="Search Supplier..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <table className="table table-bordered table-hover">

        <thead className="table-dark">

          <tr>

            <th>ID</th>

            <th>Name</th>

            <th>Phone</th>

            <th>Email</th>

            <th>Company</th>

            <th>Address</th>

            <th width="220">Action</th>

          </tr>

        </thead>

        <tbody>

          {filtered.map((supplier) => (

            <tr key={supplier.id}>

              <td>{supplier.id}</td>

              <td>{supplier.supplier_name}</td>

              <td>{supplier.phone}</td>

              <td>{supplier.email}</td>

              <td>{supplier.company}</td>

              <td>{supplier.address}</td>

              <td>

                <Link
                  className="btn btn-primary btn-sm me-2"
                  to={`/suppliers/edit/${supplier.id}`}
                >
                  Edit
                </Link>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(supplier.id)}
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

export default Suppliers;