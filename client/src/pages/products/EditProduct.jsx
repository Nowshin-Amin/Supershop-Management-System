import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  getProduct,
  updateProduct,
} from "../../api/productApi";

function EditProduct() {

  const navigate = useNavigate();
  const { id } = useParams();

  const IMAGE_URL = "https://supershop-backend-1sfq.onrender.com/uploads";

  const [product, setProduct] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    image: null,
  });

  const [preview, setPreview] = useState("");

  useEffect(() => {
    loadProduct();
  }, []);


  const loadProduct = async () => {

    try {

      const res = await getProduct(id);

      setProduct({
        name: res.data.name,
        category: res.data.category,
        price: res.data.price,
        stock: res.data.stock,
        image: null,
      });


      if (res.data.image) {

        setPreview(
          `${IMAGE_URL}/${res.data.image}`
        );

      }

    } catch (error) {

      console.log("Load Product Error:", error);

    }

  };


  const handleChange = (e) => {

    if (e.target.name === "image") {

      const file = e.target.files[0];

      setProduct({
        ...product,
        image: file,
      });


      if (file) {

        setPreview(
          URL.createObjectURL(file)
        );

      }


    } else {

      setProduct({
        ...product,
        [e.target.name]: e.target.value,
      });

    }

  };


  const handleSubmit = async (e) => {

    e.preventDefault();


    try {

      const formData = new FormData();


      formData.append(
        "name",
        product.name
      );

      formData.append(
        "category",
        product.category
      );

      formData.append(
        "price",
        product.price
      );

      formData.append(
        "stock",
        product.stock
      );


      if (product.image) {

        formData.append(
          "image",
          product.image
        );

      }


      await updateProduct(id, formData);


      alert("Product Updated Successfully");

      navigate("/products");


    } catch (error) {

      console.log("Update Product Error:", error);

      alert("Product Update Failed");

    }

  };


  return (

    <div className="container mt-4">

      <div className="card shadow">


        <div className="card-header bg-primary text-white">

          <h3>Edit Product</h3>

        </div>


        <div className="card-body">


          <form
            onSubmit={handleSubmit}
            encType="multipart/form-data"
          >


            <div className="mb-3">

              <label>Name</label>

              <input
                className="form-control"
                name="name"
                value={product.name}
                onChange={handleChange}
                required
              />

            </div>



            <div className="mb-3">

              <label>Category</label>

              <input
                className="form-control"
                name="category"
                value={product.category}
                onChange={handleChange}
                required
              />

            </div>



            <div className="mb-3">

              <label>Price</label>

              <input
                type="number"
                className="form-control"
                name="price"
                value={product.price}
                onChange={handleChange}
                required
              />

            </div>



            <div className="mb-3">

              <label>Stock</label>

              <input
                type="number"
                className="form-control"
                name="stock"
                value={product.stock}
                onChange={handleChange}
                required
              />

            </div>



            <div className="mb-3">

              <label>Image</label>

              <input
                type="file"
                className="form-control"
                name="image"
                accept="image/*"
                onChange={handleChange}
              />

            </div>



            {preview && (

              <div className="mb-3">

                <img
                  src={preview}
                  alt="Product Preview"
                  width="120"
                  style={{
                    borderRadius: "10px",
                    objectFit: "cover",
                  }}
                />

              </div>

            )}



            <button className="btn btn-primary">

              Update Product

            </button>


          </form>


        </div>


      </div>


    </div>

  );

}


export default EditProduct;