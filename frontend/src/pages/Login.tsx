// src/pages/Login.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  TextField,
  Button,
  Link,
  Paper,
  Stack,
  Alert,
} from "@mui/material";
import { useAuth } from "../context/AuthContext";
// relative path reference
import "../styles/Login.css";
import {Link as RouterLink} from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  //simple validator
  const ValidateIdentifier = () => {
    if(!identifier.trim()){
      setError("Please enter your email, username, or phone.");
      return false;
    }
    if(!password.trim()){
      setError("Password cannot be empty.");
      return false;
    }
    // If not erro then return true result in correct input
    //setError(null);
    return true
  };

  const handleLogin = async () => {
    if(!ValidateIdentifier()) return;

    setLoading(true);
    
    // send post request to the backend
    try{
      const res = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({identifier, password}),
      })

      //if login failed
      if(!res.ok){
        const data = await res.json();
        throw new Error(data.detail || "Login failed");
      }

      //if login success
      const data = await res.json();
      login(data.username); //save user status
      navigate("/home"); // successful login to homepage
    } catch (err: any){
      setError(err.message || "Login failed");
    } finally{
      setLoading(false);
    }
  };

  return (
    <Box className="login-container">
      <Paper className="login-paper" elevation={3}>
        <Typography variant="h4" align="center" gutterBottom>
          Welcome Back
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          gutterBottom>
            Please sign in to your account
        </Typography>

        {
          error && (
            <Alert security="error" sx={{ mb: 2}}>
              {error}
            </Alert>
        )}

        <Stack spacing={3} mt={3}>
          <TextField
            label="Email / Username / Phone"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            fullWidth
            disabled={loading}
            />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth 
            disabled={loading}
            />
          {error && <Alert severity="error">{error}</Alert>}
          <Button 
            variant="contained" 
            size="large" 
            fullWidth 
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
        </Stack>

        <Box className="login-footer">
          <Link component={RouterLink} to="#" variant="body2">
            Forgot password?
          </Link>
          <Link component={RouterLink} to="/register" variant="body2">
            Sign up
          </Link>
        </Box>
      </Paper>
    </Box>

  )



}

export default Login;