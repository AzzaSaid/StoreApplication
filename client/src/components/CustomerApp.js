import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import CustomerLayout from './CustomerLayout';
import HomePage from './CustomerHomePage';
import ItemsPage from './ItemsPage';
import CartPage from './CartPage';

function CustomerApp({ customer, setCustomer }) {
  const navigate = useNavigate()
  if (!customer) return navigate("/customer/login");

  return (
    <CustomerLayout user={customer} setUser={setCustomer}>
      <Routes>
        <Route path="/" element={<HomePage user={customer} />} />
        <Route path="/items" element={<ItemsPage user={customer} />} />
        <Route path="/cart" element={<CartPage user={customer} />} />
        {/* Fallback to home if route not found */}
        <Route path="*" element={navigate("/")} />
      </Routes>
    </CustomerLayout>
  );
}

export default CustomerApp;