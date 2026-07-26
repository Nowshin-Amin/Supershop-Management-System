import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addCategory } from "../../api/categoryApi";

function AddCategory() {

    const navigate = useNavigate();

    const [category, setCategory] = useState({
        category_name: "",
    });

    const handleChange = (e) => {

        setCategory({

            ...category,

            [e.target.name]: e.target.value

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        await addCategory(category);

        alert("Category Added Successfully");

        navigate("/categories");

    };

    return (

        <div className="container mt-4">

            <div className="card shadow">

                <div className="card-header bg-success text-white">

                    <h3>Add Category</h3>

                </div>

                <div className="card-body">

                    <form onSubmit={handleSubmit}>

                        <div className="mb-3">

                            <label>Category Name</label>

                            <input

                                type="text"

                                className="form-control"

                                name="category_name"

                                onChange={handleChange}

                                required

                            />

                        </div>

                        <button className="btn btn-success">

                            Save Category

                        </button>

                    </form>

                </div>

            </div>

        </div>

    );

}

export default AddCategory;