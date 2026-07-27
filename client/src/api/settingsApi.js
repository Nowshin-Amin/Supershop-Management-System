import axios from "axios";

const API = "https://supershop-backend-1sfq.onrender.com/api/settings";

// Get Settings
export const getSettings = () =>
  axios.get(API);

// Update Settings
export const updateSettings = (formData) =>
  axios.put(API, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });