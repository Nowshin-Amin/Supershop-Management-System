import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getCategories,
  deleteCategory,
} from "../../api/categoryApi";

function Categories() {
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const res = await getCategories();
      setCategories(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this category?"
    );

    if (!confirmDelete) return;

    try {
      await deleteCategory(id);

      alert("Category Deleted Successfully");

      loadCategories();
    } catch (err) {
      console.log(err);
      alert("Delete Failed");
    }
  };

  const filtered = categories.filter((item) =>
    item.category_name
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="container mt-4">

      <div className="d-flex justify-content-between align-items-center mb-3">

        <h2>Category Management</h2>

        <Link
          className="btn btn-success"
          to="/categories/add"
        >
          Add Category
        </Link>

      </div>

      <input
        className="form-control mb-3"
        placeholder="Search Category..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <table className="table table-bordered table-hover">

        <thead className="table-dark">

          <tr>

            <th>ID</th>

            <th>Category Name</th>

            <th width="220">Action</th>

          </tr>

        </thead>

        <tbody>

          {filtered.map((category) => (

            <tr key={category.id}>

              <td>{category.id}</td>

              <td>{category.category_name}</td>

              <td>

                <Link
                  className="btn btn-primary btn-sm me-2"
                  to={`/categories/edit/${category.id}`}
                >
                  Edit
                </Link>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(category.id)}
                >
                  Delete
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default Categories;