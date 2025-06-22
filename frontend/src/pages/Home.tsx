// src/pages/Home.tsx
import React from "react";
import { Typography, TextField, Button, Box } from "@mui/material";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const { user } = useAuth();

  return (
    <Box maxWidth="600px" mx="auto" mt={4}>
      <Typography variant="h4" gutterBottom>
        Welcome{user ? `, ${user.username}` : ""}
      </Typography>
      <Typography variant="body1" gutterBottom>
        Enter a keyword to analyze sentiment:
      </Typography>
      <Box display="flex" gap={2} mt={2}>
        <TextField label="Keyword" fullWidth />
        <Button variant="contained">Analyze</Button>
      </Box>
      <Box mt={4}>
        <Typography variant="h6">Analysis Result:</Typography>
        <Typography color="text.secondary">[Placeholder for result]</Typography>
      </Box>
    </Box>
  );
};

export default Home;
