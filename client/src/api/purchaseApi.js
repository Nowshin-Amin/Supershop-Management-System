import axios from "axios";

const API = "https://supershop-backend-1sfq.onrender.com/api/purchases";

export const getPurchases = () =>
  axios.get(API);

export const getPurchase = (id) =>
  axios.get(`${API}/${id}`);

export const addPurchase = (purchase) =>
  axios.post(API, purchase);

export const updatePurchase = (id, purchase) =>
  axios.put(`${API}/${id}`, purchase);

export const deletePurchase = (id) =>
  axios.delete(`${API}/${id}`);