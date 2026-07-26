import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addUser } from "../../api/userApi";

function AddUser() {

  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "Cashier",
    status: "Active",
  });

  const handleChange = (e) => {

    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (
      !user.name ||
      !user.email ||
      !user.password
    ) {
      alert("Please Fill All Fields");
      return;
    }

    try {

      await addUser(user);

      alert("User Added Successfully");

      navigate("/users");

    } catch (err) {

      console.log(err);

      alert(
        err.response?.data?.message ||
        "Failed to Add User"
      );

    }

  };

  return (

    <div className="container mt-4">

      <div className="card shadow">

        <div className="card-header bg-primary text-white">

          <h3>Add User</h3>

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

                <label>Password</label>

                <input
                  type="password"
                  className="form-control"
                  name="password"
                  value={user.password}
                  onChange={handleChange}
                  required
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
              className="btn btn-success"
            >
              Save User
            </button>

          </form>

        </div>

      </div>

    </div>

  );

}

export default AddUser;