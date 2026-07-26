import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  getBranch,
  updateBranch,
} from "../../api/branchApi";

function EditBranch() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [branch, setBranch] = useState({
    branch_name: "",
    manager_name: "",
    phone: "",
    email: "",
    address: "",
    status: "Active",
  });

  useEffect(() => {
    loadBranch();
  }, []);

  const loadBranch = async () => {

    try {

      const res = await getBranch(id);

      setBranch(res.data);

    } catch (err) {

      console.log(err);

    }

  };

  const handleChange = (e) => {

    setBranch({
      ...branch,
      [e.target.name]: e.target.value,
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await updateBranch(id, branch);

      alert("Branch Updated Successfully");

      navigate("/branches");

    } catch (err) {

      console.log(err);

      alert("Update Failed");

    }

  };

  return (

    <div className="container mt-4">

      <div className="card shadow">

        <div className="card-header bg-warning">

          <h3>Edit Branch</h3>

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
                  type="submit"
                  className="btn btn-warning"
                >
                  Update Branch
                </button>

              </div>

            </div>

          </form>

        </div>

      </div>

    </div>

  );

}

export default EditBranch;