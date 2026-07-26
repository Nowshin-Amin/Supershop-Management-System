import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getUsers,
  deleteUser,
} from "../../api/userApi";

function Users() {

  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const res = await getUsers();
      setUsers(res.data || []);
    } catch (err) {
      console.log(err);
      alert("Failed to Load Users");
    }
  };

  const handleDelete = async (id) => {

    if (!window.confirm("Are you sure you want to delete this user?")) {
      return;
    }

    try {

      await deleteUser(id);

      alert("User Deleted Successfully");

      loadUsers();

    } catch (err) {

      console.log(err);

      alert("Delete Failed");

    }

  };

  const filteredUsers = users.filter((user) =>
    (user.name || "")
      .toLowerCase()
      .includes(search.toLowerCase()) ||
    (user.email || "")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (

    <div className="container-fluid mt-4">

      <div className="d-flex justify-content-between align-items-center mb-3">

        <h2>User Management</h2>

        <Link
          to="/users/add"
          className="btn btn-primary"
        >
          + Add User
        </Link>

      </div>

      <div className="card shadow">

        <div className="card-body">

          <input
            type="text"
            className="form-control mb-3"
            placeholder="Search User..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <table className="table table-bordered table-hover">

            <thead className="table-dark">

              <tr>

                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th width="180">Action</th>

              </tr>

            </thead>

            <tbody>

              {filteredUsers.length === 0 ? (

                <tr>

                  <td
                    colSpan="6"
                    className="text-center"
                  >
                    No User Found
                  </td>

                </tr>

              ) : (

                filteredUsers.map((user) => (

                  <tr key={user.id}>

                    <td>{user.id}</td>

                    <td>{user.name}</td>

                    <td>{user.email}</td>

                    <td>

                      <span
                        className={`badge ${
                          user.role === "Admin"
                            ? "bg-danger"
                            : user.role === "Manager"
                            ? "bg-warning text-dark"
                            : "bg-success"
                        }`}
                      >
                        {user.role}
                      </span>

                    </td>

                    <td>

                      <span
                        className={`badge ${
                          user.status === "Active"
                            ? "bg-success"
                            : "bg-secondary"
                        }`}
                      >
                        {user.status}
                      </span>

                    </td>

                    <td>

                      <Link
                        to={`/users/edit/${user.id}`}
                        className="btn btn-warning btn-sm me-2"
                      >
                        Edit
                      </Link>

                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(user.id)}
                      >
                        Delete
                      </button>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>

  );

}

export default Users;