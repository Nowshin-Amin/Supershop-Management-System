import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  getBranches,
  deleteBranch,
} from "../../api/branchApi";

function Branches() {

  const [branches, setBranches] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadBranches();
  }, []);

  const loadBranches = async () => {
    try {
      const res = await getBranches();
      setBranches(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {

    if (!window.confirm("Delete this Branch?")) return;

    try {

      await deleteBranch(id);

      alert("Branch Deleted Successfully");

      loadBranches();

    } catch (err) {

      console.log(err);

    }

  };

  const filtered = branches.filter((item) =>
    item.branch_name
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (

    <div className="container mt-4">

      <div className="d-flex justify-content-between mb-3">

        <h2>Branches</h2>

        <Link
          to="/branches/add"
          className="btn btn-primary"
        >
          + Add Branch
        </Link>

      </div>

      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search Branch..."
        value={search}
        onChange={(e)=>setSearch(e.target.value)}
      />

      <table className="table table-bordered table-hover">

        <thead className="table-dark">

          <tr>

            <th>ID</th>

            <th>Branch</th>

            <th>Manager</th>

            <th>Phone</th>

            <th>Status</th>

            <th width="180">Action</th>

          </tr>

        </thead>

        <tbody>

          {filtered.length===0 ? (

            <tr>

              <td colSpan="6" className="text-center">

                No Branch Found

              </td>

            </tr>

          ) : (

            filtered.map((item)=>(

              <tr key={item.id}>

                <td>{item.id}</td>

                <td>{item.branch_name}</td>

                <td>{item.manager_name}</td>

                <td>{item.phone}</td>

                <td>{item.status}</td>

                <td>

                  <Link
                    to={`/branches/edit/${item.id}`}
                    className="btn btn-warning btn-sm me-2"
                  >
                    Edit
                  </Link>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={()=>handleDelete(item.id)}
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

  );

}

export default Branches;