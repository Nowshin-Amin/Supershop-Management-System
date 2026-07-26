import axios from "axios";

const API = "http://localhost:5000/api/settings";

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