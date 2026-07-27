import axios from "axios";

const API = "https://supershop-backend-1sfq.onrender.com/api/customers";

// Get All
export const getCustomers = () => axios.get(API);

// Get One
export const getCustomer = (id) =>
  axios.get(`${API}/${id}`);

// Add
export const addCustomer = (customer) =>
  axios.post(API, customer);

// Update
export const updateCustomer = (id, customer) =>
  axios.put(`${API}/${id}`, customer);

// Delete
export const deleteCustomer = (id) =>
  axios.delete(`${API}/${id}`);