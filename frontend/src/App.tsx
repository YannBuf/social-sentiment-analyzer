// src/App.tsx
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Account from "./pages/Account";
import Layout from "./components/Layout";
import Register from "./pages/Register";
// Forum page
import Forum from "./pages/Forum";
import PostDetail from "./components/postDetail";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* 默认跳转到 login */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forum" element={<Forum />} />
        <Route path="/forum/:id" element={<PostDetail />} />

        {/* 以下页面包裹在 Layout 中共享导航栏 */}
        <Route element={<Layout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/forum" element={<Forum />} />
          <Route path="/account" element={<Account />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
