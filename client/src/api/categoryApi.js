import axios from "axios";

const API = "http://localhost:5000/api/categories";

export const getCategories = () => axios.get(API);

export const getCategory = (id) =>
  axios.get(`${API}/${id}`);

export const addCategory = (category) =>
  axios.post(API, category);

export const updateCategory = (id, category) =>
  axios.put(`${API}/${id}`, category);

export const deleteCategory = (id) =>
  axios.delete(`${API}/${id}`);