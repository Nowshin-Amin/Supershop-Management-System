import axios from "axios";

const API = "https://supershop-backend-1sfq.onrender.com/api/branches";

// Get All
export const getBranches = () =>
  axios.get(API);

// Get Single
export const getBranch = (id) =>
  axios.get(`${API}/${id}`);

// Add
export const addBranch = (branch) =>
  axios.post(API, branch);

// Update
export const updateBranch = (id, branch) =>
  axios.put(`${API}/${id}`, branch);

// Delete
export const deleteBranch = (id) =>
  axios.delete(`${API}/${id}`);