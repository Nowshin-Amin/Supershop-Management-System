import axios from "axios";

const API = "https://supershop-backend-1sfq.onrender.com/api/users";
const getToken = () => {
  return localStorage.getItem("token");
};

// Get All Users
export const getUsers = () =>
  axios.get(API, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });

// Get Single User
export const getUser = (id) =>
  axios.get(`${API}/${id}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });

// Add User
export const addUser = (user) =>
  axios.post(API, user, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });

// Update User
export const updateUser = (id, user) =>
  axios.put(`${API}/${id}`, user, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });

// Delete User
export const deleteUser = (id) =>
  axios.delete(`${API}/${id}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });