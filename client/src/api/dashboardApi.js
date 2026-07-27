import axios from "axios";

const API = "https://supershop-backend-1sfq.onrender.com/api/dashboard";

export const getDashboard = () =>
  axios.get(API);