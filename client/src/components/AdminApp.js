import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import AdminHomePage from './AdminHomePage';
import ManageItemsPage from './ManageItemsPage';
import AdminLogin from './AdminLogin';
import AdminRegister from './AdminRegister';
import AdminLayout from './AdminLayout';

function AdminApp() {
  const [admin, setAdmin] = useState(null);

  const navigate = useNavigate()

  return (
    <Router>
      <Routes>
        {/* Login/Register pages without header */}
        <Route path="/admin/login" element={<AdminLogin setAdmin={setAdmin} />} />
        <Route path="/admin/register" element={<AdminRegister />} />

        {/* Protected admin pages with header/footer */}
        <Route
          path="/admin/*"
          element={
            admin ? (
              <AdminLayout admin={admin} setAdmin={setAdmin}>
                <Routes>
                  <Route path="" element={<AdminHomePage admin={admin} />} />
                  <Route path="manage-items" element={<ManageItemsPage />} />
                </Routes>
              </AdminLayout>
            ) : (
              navigate("/admin/login")
            )
          }
        />
      </Routes>
    </Router>
  );
}
export default AdminApp;