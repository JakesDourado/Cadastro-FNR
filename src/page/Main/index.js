import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Product from "../Product";
import Welcome from "../Welcome";
import Category from '../Category';
import Navbar from '../../components/Navbar';

export default function Main() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const handleSidebarToggle = (collapsed) => {
    setIsSidebarCollapsed(collapsed);
  };

  return (
    <div className="main-container">
      <Navbar onToggle={handleSidebarToggle} />
      <div className={`content ${isSidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/products" element={<Product />} />
          <Route path="/categories" element={<Category />} />
        </Routes>
      </div>
    </div>
  );
} 