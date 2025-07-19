// src/components/Layout.tsx
import React from "react";
import { Outlet, Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";

const Layout = () => {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Sentiment Analyzer
          </Typography>
          <Button color="inherit" component={Link} to="/home">Home</Button>
          <Button color="inherit" component={Link} to="/forum">Forum</Button>
          <Button color="inherit" component={Link} to="/account">Account</Button>
        </Toolbar>
      </AppBar>

      {/* 重要：必须加这个，否则子页面不会显示！ */}
      <Box p={4}>
        <Outlet />
      </Box>
    </>
  );
};

export default Layout;
