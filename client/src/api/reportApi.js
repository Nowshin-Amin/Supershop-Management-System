import axios from "axios";

const API = "https://supershop-backend-1sfq.onrender.com/api/reports";

// Dashboard
export const getDashboardReport = () =>
  axios.get(API);

// Low Stock
export const getLowStockProducts = () =>
  axios.get(`${API}/low-stock`);

// Recent Sales
export const getRecentSales = () =>
  axios.get(`${API}/recent-sales`);

// Recent Purchases
export const getRecentPurchases = () =>
  axios.get(`${API}/recent-purchases`);

// Monthly Sales
export const getMonthlySales = () =>
  axios.get(`${API}/monthly-sales`);