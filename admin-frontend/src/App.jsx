import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "./components/AdminLayout.jsx";
import AdminLoginPage from "./pages/AdminLoginPage.jsx";
import DashboardHome from "./pages/DashboardHome.jsx";
import BrandingPage from "./pages/BrandingPage.jsx";
import ThemePage from "./pages/ThemePage.jsx";
import CategoriesAdminPage from "./pages/CategoriesAdminPage.jsx";
import ProductsAdminPage from "./pages/ProductsAdminPage.jsx";
import OrdersAdminPage from "./pages/OrdersAdminPage.jsx";
import PaymentsPage from "./pages/PaymentsPage.jsx";
import UsersPage from "./pages/UsersPage.jsx";
import { useAdminAuth } from "./context/AdminAuthContext.jsx";

const ProtectedAdmin = ({ children }) => {
  const { admin } = useAdminAuth();
  if (!admin) return <Navigate to="/login" replace />;
  return children;
};

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<AdminLoginPage />} />
      <Route
        path="/*"
        element={
          <ProtectedAdmin>
            <AdminLayout />
          </ProtectedAdmin>
        }
      >
        <Route index element={<DashboardHome />} />
        <Route path="branding" element={<BrandingPage />} />
        <Route path="theme" element={<ThemePage />} />
        <Route path="categories" element={<CategoriesAdminPage />} />
        <Route path="products" element={<ProductsAdminPage />} />
        <Route path="orders" element={<OrdersAdminPage />} />
        <Route path="payments" element={<PaymentsPage />} />
        <Route path="users" element={<UsersPage />} />
      </Route>
    </Routes>
  );
}
