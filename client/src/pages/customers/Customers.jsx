import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getCustomers,
  deleteCustomer,
} from "../../api/customerApi";

function Customers() {
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = async () => {
    try {
      const res = await getCustomers();
      setCustomers(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this customer?"
    );

    if (!confirmDelete) return;

    try {
      await deleteCustomer(id);

      alert("Customer Deleted Successfully");

      loadCustomers();
    } catch (err) {
      console.log(err);
      alert("Delete Failed");
    }
  };

  const filteredCustomers = customers.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mt-4">

      <div className="d-flex justify-content-between align-items-center mb-3">

        <h2>Customer Management</h2>

        <Link
          className="btn btn-success"
          to="/customers/add"
        >
          Add Customer
        </Link>

      </div>

      <input
        className="form-control mb-3"
        placeholder="Search Customer..."
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

            <th>Address</th>

            <th width="220">Action</th>

          </tr>

        </thead>

        <tbody>

          {filteredCustomers.map((customer) => (

            <tr key={customer.id}>

              <td>{customer.id}</td>

              <td>{customer.name}</td>

              <td>{customer.phone}</td>

              <td>{customer.email}</td>

              <td>{customer.address}</td>

              <td>

                <Link
                  className="btn btn-primary btn-sm me-2"
                  to={`/customers/edit/${customer.id}`}
                >
                  Edit
                </Link>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(customer.id)}
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

export default Customers;