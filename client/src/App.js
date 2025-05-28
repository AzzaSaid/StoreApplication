import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainPage from './components/MainPage';
import AdminLogin from './components/AdminLogin';
import AdminRegister from './components/AdminRegister';
import AdminApp from './components/AdminApp'; // Contains admin-only routes/layout
import CustomerLogin from './components/CustomerLogin';
import CustomerRegister from './components/CustomerRegister';
import CustomerApp from './components/CustomerApp'; // Contains customer-only routes/layout

function App() {
  const [admin, setAdmin] = useState(null);
  const [customer, setCustomer] = useState(null);

  return (
    <Router>
      <Routes>
        {/* Main landing page */}
        <Route path="/" element={<MainPage />} />

        {/* Admin routes */}
        <Route path="/admin/login" element={<AdminLogin setAdmin={setAdmin} />} />
        <Route path="/admin/register" element={<AdminRegister />} />
        <Route
          path="/admin/*"
          element={
            admin ? <AdminApp admin={admin} setAdmin={setAdmin} /> : <Navigate to="/admin/login" />
          }
        />

        {/* Customer routes */}
        <Route path="/customer/login" element={<CustomerLogin setCustomer={setCustomer} />} />
        <Route path="/customer/register" element={<CustomerRegister />} />
        <Route
          path="/customer/*"
          element={
            customer ? <CustomerApp customer={customer} setCustomer={setCustomer} /> : <Navigate to="/customer/login" />
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;