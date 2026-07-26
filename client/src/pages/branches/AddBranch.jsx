import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { addBranch } from "../../api/branchApi";

function AddBranch() {

  const navigate = useNavigate();

  const [branch, setBranch] = useState({
    branch_name: "",
    manager_name: "",
    phone: "",
    email: "",
    address: "",
    status: "Active",
  });

  const handleChange = (e) => {

    setBranch({
      ...branch,
      [e.target.name]: e.target.value,
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await addBranch(branch);

      alert("Branch Added Successfully");

      navigate("/branches");

    } catch (err) {

      console.log(err);

      alert("Failed to Add Branch");

    }

  };

  return (

    <div className="container mt-4">

      <div className="card shadow">

        <div className="card-header bg-primary text-white">

          <h3>Add Branch</h3>

        </div>

        <div className="card-body">

          <form onSubmit={handleSubmit}>

            <div className="row">

              <div className="col-md-6 mb-3">

                <label>Branch Name</label>

                <input
                  type="text"
                  name="branch_name"
                  className="form-control"
                  value={branch.branch_name}
                  onChange={handleChange}
                  required
                />

              </div>

              <div className="col-md-6 mb-3">

                <label>Manager Name</label>

                <input
                  type="text"
                  name="manager_name"
                  className="form-control"
                  value={branch.manager_name}
                  onChange={handleChange}
                  required
                />

              </div>

              <div className="col-md-6 mb-3">

                <label>Phone</label>

                <input
                  type="text"
                  name="phone"
                  className="form-control"
                  value={branch.phone}
                  onChange={handleChange}
                  required
                />

              </div>

              <div className="col-md-6 mb-3">

                <label>Email</label>

                <input
                  type="email"
                  name="email"
                  className="form-control"
                  value={branch.email}
                  onChange={handleChange}
                />

              </div>

              <div className="col-md-12 mb-3">

                <label>Address</label>

                <textarea
                  rows="3"
                  name="address"
                  className="form-control"
                  value={branch.address}
                  onChange={handleChange}
                ></textarea>

              </div>

              <div className="col-md-6 mb-3">

                <label>Status</label>

                <select
                  name="status"
                  className="form-control"
                  value={branch.status}
                  onChange={handleChange}
                >
                  <option>Active</option>
                  <option>Inactive</option>
                </select>

              </div>

              <div className="col-md-12">

                <button
                  className="btn btn-success"
                  type="submit"
                >
                  Save Branch
                </button>

              </div>

            </div>

          </form>

        </div>

      </div>

    </div>

  );

}

export default AddBranch;