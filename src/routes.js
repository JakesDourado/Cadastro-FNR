import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Main from './page/Main';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/*" element={<Main />} />
    </Routes>
  );
}