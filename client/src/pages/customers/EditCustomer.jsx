import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getCustomer,
  updateCustomer,
} from "../../api/customerApi";

function EditCustomer() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
  });

  useEffect(() => {
    loadCustomer();
  }, []);

  const loadCustomer = async () => {
    const res = await getCustomer(id);
    setCustomer(res.data);
  };

  const handleChange = (e) => {
    setCustomer({
      ...customer,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await updateCustomer(id, customer);

    alert("Customer Updated Successfully");

    navigate("/customers");
  };

  return (
    <div className="container mt-4">

      <div className="card shadow">

        <div className="card-header bg-primary text-white">

          <h3>Edit Customer</h3>

        </div>

        <div className="card-body">

          <form onSubmit={handleSubmit}>

            <div className="mb-3">

              <label>Name</label>

              <input
                className="form-control"
                name="name"
                value={customer.name}
                onChange={handleChange}
              />

            </div>

            <div className="mb-3">

              <label>Phone</label>

              <input
                className="form-control"
                name="phone"
                value={customer.phone}
                onChange={handleChange}
              />

            </div>

            <div className="mb-3">

              <label>Email</label>

              <input
                className="form-control"
                name="email"
                value={customer.email}
                onChange={handleChange}
              />

            </div>

            <div className="mb-3">

              <label>Address</label>

              <textarea
                className="form-control"
                rows="3"
                name="address"
                value={customer.address}
                onChange={handleChange}
              ></textarea>

            </div>

            <button className="btn btn-primary">

              Update Customer

            </button>

          </form>

        </div>

      </div>

    </div>
  );
}

export default EditCustomer;