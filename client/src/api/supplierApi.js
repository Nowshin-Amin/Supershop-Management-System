import axios from "axios";

const API = "https://supershop-backend-1sfq.onrender.com/api/suppliers";

// Get All
export const getSuppliers = () => axios.get(API);

// Get One
export const getSupplier = (id) =>
  axios.get(`${API}/${id}`);

// Add
export const addSupplier = (supplier) =>
  axios.post(API, supplier);

// Update
export const updateSupplier = (id, supplier) =>
  axios.put(`${API}/${id}`, supplier);

// Delete
export const deleteSupplier = (id) =>
  axios.delete(`${API}/${id}`);