import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';

export default function AppRoutes() {
  const isLoggedIn = Boolean(localStorage.getItem('token')); // ¼òµ¥Ê¾Àý

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={isLoggedIn ? <Home /> : <Navigate to="/login" replace />}
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
