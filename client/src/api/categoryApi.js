import axios from "axios";

export const API =
  "https://supershop-backend-1sfq.onrender.com/api/categories";


// Get all categories
export const getCategories = () =>
  axios.get(API);


// Get single category
export const getCategory = (id) =>
  axios.get(`${API}/${id}`);


// Add category
export const addCategory = (category) =>
  axios.post(API, category);


// Update category
export const updateCategory = (id, category) =>
  axios.put(`${API}/${id}`, category);


// Delete category
export const deleteCategory = (id) =>
  axios.delete(`${API}/${id}`);