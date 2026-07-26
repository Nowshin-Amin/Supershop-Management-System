import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addCustomer } from "../../api/customerApi";

function AddCustomer() {

  const navigate = useNavigate();

  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
  });

  const handleChange = (e) => {
    setCustomer({
      ...customer,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    await addCustomer(customer);

    alert("Customer Added Successfully");

    navigate("/customers");

  };

  return (

    <div className="container mt-4">

      <div className="card shadow">

        <div className="card-header bg-success text-white">

          <h3>Add Customer</h3>

        </div>

        <div className="card-body">

          <form onSubmit={handleSubmit}>

            <div className="mb-3">

              <label>Name</label>

              <input
                type="text"
                className="form-control"
                name="name"
                onChange={handleChange}
                required
              />

            </div>

            <div className="mb-3">

              <label>Phone</label>

              <input
                type="text"
                className="form-control"
                name="phone"
                onChange={handleChange}
                required
              />

            </div>

            <div className="mb-3">

              <label>Email</label>

              <input
                type="email"
                className="form-control"
                name="email"
                onChange={handleChange}
                required
              />

            </div>

            <div className="mb-3">

              <label>Address</label>

              <textarea
                className="form-control"
                name="address"
                rows="3"
                onChange={handleChange}
                required
              ></textarea>

            </div>

            <button className="btn btn-success">
              Save Customer
            </button>

          </form>

        </div>

      </div>

    </div>

  );

}

export default AddCustomer;