import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Stack,
  Alert,
  Link,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Register.css";
import { Password } from "@mui/icons-material";

const Register = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        username: "",
        email: "",
        phone: "",
        password: "",
    });

    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value});
    };

    const handleRegister = async () => {
        setError(null);
        setSuccess(false);

        if(
            !form.username ||
            !form.email.includes("@") ||
            !form.phone ||
            !form.password
        ){
            setError("please fil in all fields with valid infomation.");
            return;
        }

        try{
            const res = await axios.post("http://localhost:8000/register", form);
            setSuccess(true);
            setTimeout(() => navigate("/login"), 1500);
        } catch (err: any){
            setError(err.response?.data?.detail || "Registration failed")
        }
    };

    return (
    <div className="register-container">
      <Paper elevation={3} className="register-paper">
        <Typography variant="h4" align="center" gutterBottom>
          Create an Account
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          gutterBottom
        >
          Please fill in the details below
        </Typography>

        <Stack spacing={3} mt={3}>
          <TextField
            name="username"
            label="Username"
            value={form.username}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            name="email"
            label="Email"
            value={form.email}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            name="phone"
            label="Phone Number"
            value={form.phone}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            name="password"
            label="Password"
            type="password"
            value={form.password}
            onChange={handleChange}
            fullWidth
          />
          <Button variant="contained" size="large" onClick={handleRegister}>
            Register
          </Button>
        </Stack>

        {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
        {success && (
          <Alert severity="success" sx={{ mt: 2 }}>
            Registration successful! Redirecting to login...
          </Alert>
        )}

        <div style={{ marginTop: 16, textAlign: "center" }}>
          <Link href="/login" variant="body2">
            Already have an account? Sign in
          </Link>
        </div>
      </Paper>
    </div>
    );

}

export default Register;