import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProducts, deleteProduct } from "../../api/productApi";

function Products() {

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {

    try {

      const res = await getProducts();

      setProducts(res.data);

    } catch (error) {

      console.log(error);

    }

  };

  const handleDelete = async (id) => {

    if (!window.confirm("Delete this product?")) return;

    try {

      await deleteProduct(id);

      alert("Product Deleted Successfully");

      loadProducts();

    } catch (error) {

      console.log(error);

      alert("Delete Failed");

    }

  };

  const filteredProducts = products.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (

    <div className="container mt-4">

      <div className="d-flex justify-content-between mb-3">

        <h2>Product Management</h2>

        <Link
          to="/products/add"
          className="btn btn-success"
        >
          Add Product
        </Link>

      </div>

      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search Product..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <table className="table table-bordered table-hover">

        <thead className="table-dark">

          <tr>

            <th>ID</th>

            <th>Image</th>

            <th>Name</th>

            <th>Category</th>

            <th>Price</th>

            <th>Stock</th>

            <th width="220">Action</th>

          </tr>

        </thead>

        <tbody>

          {filteredProducts.map((product) => (

            <tr key={product.id}>

              <td>{product.id}</td>

              <td>

                {product.image ? (

                  <img
  src={`https://supershop-backend-1sfq.onrender.com/uploads/${product.image}`}
  alt={product.name}
  width="60"
  height="60"
/>

                ) : (

                  <span className="text-muted">
                    No Image
                  </span>

                )}

              </td>

              <td>{product.name}</td>

              <td>{product.category}</td>

              <td>৳ {product.price}</td>

              <td>{product.stock}</td>

              <td>

                <Link
                  to={`/products/edit/${product.id}`}
                  className="btn btn-primary btn-sm me-2"
                >
                  Edit
                </Link>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(product.id)}
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

export default Products;