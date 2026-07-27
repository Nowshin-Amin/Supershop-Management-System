import axios from "axios";

const API = "https://supershop-backend-1sfq.onrender.com/api/auth";

export const loginUser = (user) =>
  axios.post(`${API}/login`, user);