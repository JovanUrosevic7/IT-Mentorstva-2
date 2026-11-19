import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { getUserRecords } from "./services/recordService";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Records from "./pages/Records";
import AddRecord from "./pages/AddRecord";
import Metrics from "./pages/Metrics";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import ReminderManager from "./components/ReminderManager";

function ProtectedLayout({ children }) {
  const { currentUser } = useAuth();
  const [records, setRecords] = useState([]);

  useEffect(() => {
    let active = true;
    async function fetchForReminders() {
      if (!currentUser) return;
      try {
        const data = await getUserRecords(currentUser.uid);
        if (active) setRecords(data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchForReminders();
    return () => {
      active = false;
    };
  }, [currentUser]);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <ReminderManager records={records} />
      <main className="max-w-6xl mx-auto px-4 py-8">{children}</main>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastContainer position="top-right" autoClose={4000} />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <ProtectedLayout>
                  <Dashboard />
                </ProtectedLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/records"
            element={
              <ProtectedRoute>
                <ProtectedLayout>
                  <Records />
                </ProtectedLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/records/new"
            element={
              <ProtectedRoute>
                <ProtectedLayout>
                  <AddRecord />
                </ProtectedLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/metrics"
            element={
              <ProtectedRoute>
                <ProtectedLayout>
                  <Metrics />
                </ProtectedLayout>
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}