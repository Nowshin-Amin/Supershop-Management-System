import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addProduct } from "../../api/productApi";

function AddProduct() {

  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    image: null,
  });

  const handleChange = (e) => {

    if (e.target.name === "image") {

      setProduct({
        ...product,
        image: e.target.files[0],
      });

    } else {

      setProduct({
        ...product,
        [e.target.name]: e.target.value,
      });

    }

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    const formData = new FormData();

    formData.append("name", product.name);
    formData.append("category", product.category);
    formData.append("price", product.price);
    formData.append("stock", product.stock);

    if (product.image) {
      formData.append("image", product.image);
    }

    try {

      await addProduct(formData);

      alert("Product Added Successfully");

      navigate("/products");

   } catch (error) {

  console.log(error);

  console.log("Response:", error.response);

  console.log("Data:", error.response?.data);

  alert(
    error.response?.data?.sqlMessage ||
    error.response?.data?.message ||
    JSON.stringify(error.response?.data) ||
    error.message
  );

}

  };

  return (

    <div className="container mt-4">

      <div className="card shadow">

        <div className="card-header bg-success text-white">

          <h3>Add Product</h3>

        </div>

        <div className="card-body">

          <form onSubmit={handleSubmit} encType="multipart/form-data">

            <div className="mb-3">

              <label className="form-label">
                Product Name
              </label>

              <input
                type="text"
                className="form-control"
                name="name"
                onChange={handleChange}
                required
              />

            </div>

            <div className="mb-3">

              <label className="form-label">
                Category
              </label>

              <input
                type="text"
                className="form-control"
                name="category"
                onChange={handleChange}
                required
              />

            </div>

            <div className="mb-3">

              <label className="form-label">
                Price
              </label>

              <input
                type="number"
                className="form-control"
                name="price"
                onChange={handleChange}
                required
              />

            </div>

            <div className="mb-3">

              <label className="form-label">
                Stock
              </label>

              <input
                type="number"
                className="form-control"
                name="stock"
                onChange={handleChange}
                required
              />

            </div>

            <div className="mb-3">

              <label className="form-label">
                Product Image
              </label>

              <input
                type="file"
                className="form-control"
                name="image"
                accept="image/*"
                onChange={handleChange}
              />

            </div>

            <button className="btn btn-success">

              Save Product

            </button>

          </form>

        </div>

      </div>

    </div>

  );

}

export default AddProduct;