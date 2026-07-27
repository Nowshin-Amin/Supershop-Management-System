import axios from "axios";

const API = "https://supershop-backend-1sfq.onrender.com/api/products";

// ======================
// GET ALL PRODUCTS
// ======================
export const getProducts = () =>
  axios.get(API);

// ======================
// GET SINGLE PRODUCT
// ======================
export const getProduct = (id) =>
  axios.get(`${API}/${id}`);

// ======================
// ADD PRODUCT
// ======================
export const addProduct = (formData) =>
  axios.post(API, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

// ======================
// UPDATE PRODUCT
// ======================
export const updateProduct = (id, formData) =>
  axios.put(`${API}/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

// ======================
// DELETE PRODUCT
// ======================
export const deleteProduct = (id) =>
  axios.delete(`${API}/${id}`);