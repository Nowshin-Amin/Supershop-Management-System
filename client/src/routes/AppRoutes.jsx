import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProtectedRoute from "../components/ProtectedRoute";
import RoleRoute from "../components/RoleRoute";

import MainLayout from "../layouts/MainLayout";

// Auth
import Login from "../pages/auth/Login";

// Dashboard
import Dashboard from "../pages/dashboard/Dashboard";

// Users
import Users from "../pages/users/Users";
import AddUser from "../pages/users/AddUser";
import EditUser from "../pages/users/EditUser";

// Products
import Products from "../pages/products/Products";
import AddProduct from "../pages/products/AddProduct";
import EditProduct from "../pages/products/EditProduct";

// Categories
import Categories from "../pages/categories/Categories";
import AddCategory from "../pages/categories/AddCategory";
import EditCategory from "../pages/categories/EditCategory";

// Customers
import Customers from "../pages/customers/Customers";
import AddCustomer from "../pages/customers/AddCustomer";
import EditCustomer from "../pages/customers/EditCustomer";

// Suppliers
import Suppliers from "../pages/suppliers/Suppliers";
import AddSupplier from "../pages/suppliers/AddSupplier";
import EditSupplier from "../pages/suppliers/EditSupplier";

// Purchases
import Purchases from "../pages/purchases/Purchases";
import AddPurchase from "../pages/purchases/AddPurchase";
import EditPurchase from "../pages/purchases/EditPurchase";

// Sales
import Sales from "../pages/sales/Sales";
import AddSale from "../pages/sales/AddSale";
import EditSale from "../pages/sales/EditSale";
import Invoice from "../pages/sales/Invoice";

// Reports
import Reports from "../pages/reports/Reports";

// Branches
import Branches from "../pages/branches/Branches";
import AddBranch from "../pages/branches/AddBranch";
import EditBranch from "../pages/branches/EditBranch";

// Settings
import Settings from "../pages/settings/Settings";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Login */}

        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />

        {/* Dashboard */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Dashboard />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        {/* Users */}

        <Route
          path="/users"
          element={
            <RoleRoute roles={["Admin"]}>
              <MainLayout>
                <Users />
              </MainLayout>
            </RoleRoute>
          }
        />

        <Route
          path="/users/add"
          element={
            <RoleRoute roles={["Admin"]}>
              <MainLayout>
                <AddUser />
              </MainLayout>
            </RoleRoute>
          }
        />

        <Route
          path="/users/edit/:id"
          element={
            <RoleRoute roles={["Admin"]}>
              <MainLayout>
                <EditUser />
              </MainLayout>
            </RoleRoute>
          }
        />

        {/* Products */}

        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Products />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/products/add"
          element={
            <ProtectedRoute>
              <MainLayout>
                <AddProduct />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/products/edit/:id"
          element={
            <ProtectedRoute>
              <MainLayout>
                <EditProduct />
              </MainLayout>
            </ProtectedRoute>
          }
        />
                {/* Categories */}

        <Route
          path="/categories"
          element={
            <RoleRoute roles={["Admin", "Manager"]}>
              <MainLayout>
                <Categories />
              </MainLayout>
            </RoleRoute>
          }
        />

        <Route
          path="/categories/add"
          element={
            <RoleRoute roles={["Admin", "Manager"]}>
              <MainLayout>
                <AddCategory />
              </MainLayout>
            </RoleRoute>
          }
        />

        <Route
          path="/categories/edit/:id"
          element={
            <RoleRoute roles={["Admin", "Manager"]}>
              <MainLayout>
                <EditCategory />
              </MainLayout>
            </RoleRoute>
          }
        />

        {/* Customers */}

        <Route
          path="/customers"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Customers />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/customers/add"
          element={
            <ProtectedRoute>
              <MainLayout>
                <AddCustomer />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/customers/edit/:id"
          element={
            <ProtectedRoute>
              <MainLayout>
                <EditCustomer />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        {/* Suppliers */}

        <Route
          path="/suppliers"
          element={
            <RoleRoute roles={["Admin", "Manager"]}>
              <MainLayout>
                <Suppliers />
              </MainLayout>
            </RoleRoute>
          }
        />

        <Route
          path="/suppliers/add"
          element={
            <RoleRoute roles={["Admin", "Manager"]}>
              <MainLayout>
                <AddSupplier />
              </MainLayout>
            </RoleRoute>
          }
        />

        <Route
          path="/suppliers/edit/:id"
          element={
            <RoleRoute roles={["Admin", "Manager"]}>
              <MainLayout>
                <EditSupplier />
              </MainLayout>
            </RoleRoute>
          }
        />
                {/* Purchases */}

        <Route
          path="/purchases"
          element={
            <RoleRoute roles={["Admin", "Manager"]}>
              <MainLayout>
                <Purchases />
              </MainLayout>
            </RoleRoute>
          }
        />

        <Route
          path="/purchases/add"
          element={
            <RoleRoute roles={["Admin", "Manager"]}>
              <MainLayout>
                <AddPurchase />
              </MainLayout>
            </RoleRoute>
          }
        />

        <Route
          path="/purchases/edit/:id"
          element={
            <RoleRoute roles={["Admin", "Manager"]}>
              <MainLayout>
                <EditPurchase />
              </MainLayout>
            </RoleRoute>
          }
        />

        {/* Sales */}

        <Route
          path="/sales"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Sales />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/sales/add"
          element={
            <ProtectedRoute>
              <MainLayout>
                <AddSale />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/sales/edit/:id"
          element={
            <ProtectedRoute>
              <MainLayout>
                <EditSale />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/invoice/:id"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Invoice />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        {/* Reports */}

        <Route
          path="/reports"
          element={
            <RoleRoute roles={["Admin", "Manager"]}>
              <MainLayout>
                <Reports />
              </MainLayout>
            </RoleRoute>
          }
        />
                {/* Branches */}

        <Route
          path="/branches"
          element={
            <RoleRoute roles={["Admin", "Manager"]}>
              <MainLayout>
                <Branches />
              </MainLayout>
            </RoleRoute>
          }
        />

        <Route
          path="/branches/add"
          element={
            <RoleRoute roles={["Admin", "Manager"]}>
              <MainLayout>
                <AddBranch />
              </MainLayout>
            </RoleRoute>
          }
        />

        <Route
          path="/branches/edit/:id"
          element={
            <RoleRoute roles={["Admin", "Manager"]}>
              <MainLayout>
                <EditBranch />
              </MainLayout>
            </RoleRoute>
          }
        />

        {/* Settings */}

        <Route
          path="/settings"
          element={
            <RoleRoute roles={["Admin"]}>
              <MainLayout>
                <Settings />
              </MainLayout>
            </RoleRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;