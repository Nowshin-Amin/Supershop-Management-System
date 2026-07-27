import axios from "axios";

const API = "https://supershop-backend-1sfq.onrender.com/api/sales";

// Get All
export const getSales = () =>
  axios.get(API);

// Get One
export const getSale = (id) =>
  axios.get(`${API}/${id}`);

// Add
export const addSale = (sale) =>
  axios.post(API, sale);

// Update
export const updateSale = (id, sale) =>
  axios.put(`${API}/${id}`, sale);

// Delete
export const deleteSale = (id) =>
  axios.delete(`${API}/${id}`);