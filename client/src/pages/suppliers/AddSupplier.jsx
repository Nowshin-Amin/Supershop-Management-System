import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addSupplier } from "../../api/supplierApi";

function AddSupplier() {

  const navigate = useNavigate();

  const [supplier, setSupplier] = useState({
    supplier_name: "",
    phone: "",
    email: "",
    company: "",
    address: "",
  });

  const handleChange = (e) => {
    setSupplier({
      ...supplier,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await addSupplier(supplier);

    alert("Supplier Added Successfully");

    navigate("/suppliers");
  };

  return (
    <div className="container mt-4">

      <div className="card shadow">

        <div className="card-header bg-success text-white">

          <h3>Add Supplier</h3>

        </div>

        <div className="card-body">

          <form onSubmit={handleSubmit}>

            <div className="mb-3">
              <label>Supplier Name</label>
              <input
                className="form-control"
                name="supplier_name"
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label>Phone</label>
              <input
                className="form-control"
                name="phone"
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label>Email</label>
              <input
                className="form-control"
                type="email"
                name="email"
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label>Company</label>
              <input
                className="form-control"
                name="company"
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label>Address</label>
              <textarea
                className="form-control"
                rows="3"
                name="address"
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <button className="btn btn-success">
              Save Supplier
            </button>

          </form>

        </div>

      </div>

    </div>
  );
}

export default AddSupplier;