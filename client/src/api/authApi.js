import axios from "axios";

const API = "http://localhost:5000/api/auth";

export const loginUser = (user) =>
  axios.post(`${API}/login`, user);