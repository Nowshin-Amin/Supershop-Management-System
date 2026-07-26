import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getSupplier,
  updateSupplier,
} from "../../api/supplierApi";

function EditSupplier() {

  const navigate = useNavigate();

  const { id } = useParams();

  const [supplier, setSupplier] = useState({
    supplier_name: "",
    phone: "",
    email: "",
    company: "",
    address: "",
  });

  useEffect(() => {
    loadSupplier();
  }, []);

  const loadSupplier = async () => {
    const res = await getSupplier(id);
    setSupplier(res.data);
  };

  const handleChange = (e) => {
    setSupplier({
      ...supplier,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await updateSupplier(id, supplier);

    alert("Supplier Updated Successfully");

    navigate("/suppliers");
  };

  return (
    <div className="container mt-4">

      <div className="card shadow">

        <div className="card-header bg-primary text-white">

          <h3>Edit Supplier</h3>

        </div>

        <div className="card-body">

          <form onSubmit={handleSubmit}>

            <div className="mb-3">
              <label>Supplier Name</label>
              <input
                className="form-control"
                name="supplier_name"
                value={supplier.supplier_name}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label>Phone</label>
              <input
                className="form-control"
                name="phone"
                value={supplier.phone}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label>Email</label>
              <input
                className="form-control"
                name="email"
                value={supplier.email}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label>Company</label>
              <input
                className="form-control"
                name="company"
                value={supplier.company}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label>Address</label>
              <textarea
                className="form-control"
                rows="3"
                name="address"
                value={supplier.address}
                onChange={handleChange}
              ></textarea>
            </div>

            <button className="btn btn-primary">
              Update Supplier
            </button>

          </form>

        </div>

      </div>

    </div>
  );
}

export default EditSupplier;