import axios from "axios";

const API = "http://localhost:5000/api/suppliers";

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