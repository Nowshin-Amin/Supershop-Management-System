import axios from "axios";


export const API = "https://supershop-backend-1sfq.onrender.com/api/categories";

export const getCategory = (id) =>
  axios.get(`${API}/${id}`);

export const addCategory = (category) =>
  axios.post(API, category);

export const updateCategory = (id, category) =>
  axios.put(`${API}/${id}`, category);

export const deleteCategory = (id) =>
  axios.delete(`${API}/${id}`);