import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Login from "./components/Auth/Login";
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import Layout from "./components/Layout/Layout";
import Dashboard from "./pages/Dashboard";
import UserDashboard from "./pages/UserDashboard";
import EmployeeManagement from "./pages/EmployeeManagement";
import RemoteAppPage from "./pages/RemoteAppPage";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Layout>
                  <Dashboard />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/my-dashboard"
            element={
              <ProtectedRoute>
                <Layout>
                  <UserDashboard />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/employees"
            element={
              <ProtectedRoute>
                <Layout>
                  <EmployeeManagement />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/app/:appId"
            element={
              <ProtectedRoute>
                <Layout>
                  <RemoteAppPage />
                </Layout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Navigate
                  to={
                    JSON.parse(localStorage.getItem("user") || "{}").role ===
                    "Admin"
                      ? "/dashboard"
                      : "/my-dashboard"
                  }
                  replace
                />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
