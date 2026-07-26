import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getCategory,
  updateCategory,
} from "../../api/categoryApi";

function EditCategory() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [category, setCategory] = useState({
    category_name: "",
  });

  useEffect(() => {
    loadCategory();
  }, []);

  const loadCategory = async () => {
    const res = await getCategory(id);
    setCategory(res.data);
  };

  const handleChange = (e) => {
    setCategory({
      ...category,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await updateCategory(id, category);

    alert("Category Updated Successfully");

    navigate("/categories");
  };

  return (
    <div className="container mt-4">

      <div className="card shadow">

        <div className="card-header bg-primary text-white">

          <h3>Edit Category</h3>

        </div>

        <div className="card-body">

          <form onSubmit={handleSubmit}>

            <div className="mb-3">

              <label>Category Name</label>

              <input
                className="form-control"
                name="category_name"
                value={category.category_name}
                onChange={handleChange}
              />

            </div>

            <button className="btn btn-primary">

              Update Category

            </button>

          </form>

        </div>

      </div>

    </div>
  );
}

export default EditCategory;