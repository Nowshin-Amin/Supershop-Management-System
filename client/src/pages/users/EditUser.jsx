import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  getUser,
  updateUser,
} from "../../api/userApi";

function EditUser() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "Cashier",
    status: "Active",
  });

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {

    try {

      const res = await getUser(id);

      setUser({
        name: res.data.name || "",
        email: res.data.email || "",
        password: "",
        role: res.data.role || "Cashier",
        status: res.data.status || "Active",
      });

    } catch (err) {

      console.log(err);

      alert("Failed to Load User");

    }

  };

  const handleChange = (e) => {

    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!user.name || !user.email) {
      alert("Please Fill All Required Fields");
      return;
    }

    try {

      await updateUser(id, user);

      alert("User Updated Successfully");

      navigate("/users");

    } catch (err) {

      console.log(err);

      alert(
        err.response?.data?.message ||
        "Update Failed"
      );

    }

  };

  return (

    <div className="container mt-4">

      <div className="card shadow">

        <div className="card-header bg-warning">

          <h3>Edit User</h3>

        </div>

        <div className="card-body">

          <form onSubmit={handleSubmit}>

            <div className="row">

              <div className="col-md-6 mb-3">

                <label>Name</label>

                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={user.name}
                  onChange={handleChange}
                  required
                />

              </div>

              <div className="col-md-6 mb-3">

                <label>Email</label>

                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                  required
                />

              </div>

              <div className="col-md-6 mb-3">

                <label>New Password</label>

                <input
                  type="password"
                  className="form-control"
                  name="password"
                  value={user.password}
                  onChange={handleChange}
                  placeholder="Leave Blank if No Change"
                />

              </div>

              <div className="col-md-3 mb-3">

                <label>Role</label>

                <select
                  className="form-control"
                  name="role"
                  value={user.role}
                  onChange={handleChange}
                >
                  <option value="Admin">Admin</option>
                  <option value="Manager">Manager</option>
                  <option value="Cashier">Cashier</option>
                </select>

              </div>

              <div className="col-md-3 mb-3">

                <label>Status</label>

                <select
                  className="form-control"
                  name="status"
                  value={user.status}
                  onChange={handleChange}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>

              </div>

            </div>

            <button
              type="submit"
              className="btn btn-warning"
            >
              Update User
            </button>

          </form>

        </div>

      </div>

    </div>

  );

}

export default EditUser;