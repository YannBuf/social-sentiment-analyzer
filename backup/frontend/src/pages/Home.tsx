// src/pages/Home.tsx
/*
import React, { useState } from "react";
import axios from "axios";
import {
  Typography,
  TextField,
  Button,
  Box,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useAuth } from "../context/AuthContext";
import SentimentResult from "../components/sentimentResult";

const Home = () => {
  const { user } = useAuth();

  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<any>(null);
  const [error, setError] = useState("");

  const handleAnalyze = async () => {
    if (!keyword.trim()) return;

    setLoading(true);
    setError("");
    setAnalysis(null);

    try {
      const response = await axios.post("/analyze_reddit", {
        keyword,
        max_count: 20,
      });
      setAnalysis(response.data.analysis);
    } catch (err: any) {
      console.error(err);
      setError("Failed to fetch analysis.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box maxWidth="600px" mx="auto" mt={4}>
      <Typography variant="h4" gutterBottom>
        Welcome{user ? `, ${user.username}` : ""}
      </Typography>
      <Typography variant="body1" gutterBottom>
        Enter a keyword to analyze sentiment:
      </Typography>

      <Box display="flex" gap={2} mt={2}>
        <TextField
          label="Keyword"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          fullWidth
        />
        <Button variant="contained" onClick={handleAnalyze} disabled={loading}>
          Analyze
        </Button>
      </Box>

      <Box mt={4}>
        {loading && <CircularProgress />}
        {error && <Alert severity="error">{error}</Alert>}
        {analysis && (
          <>
            <SentimentResult analysis={analysis} />
          </>
        )}
      </Box>
    </Box>
  );
};

export default Home;*/
import React, { useState } from "react";
import {
  Typography,
  TextField,
  Button,
  Box,
  CircularProgress,
} from "@mui/material";
import { useAuth } from "../context/AuthContext";
import SentimentResult from "../components/sentimentResult";
import axios from "axios";

const Home = () => {
  const { user } = useAuth();
  const [keyword, setKeyword] = useState("");
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAnalyze = async () => {
    if (!keyword.trim()) return;
    setLoading(true);
    setError("");
    setAnalysis(null);

    try {
      const response = await axios.post("http://localhost:8000/analyze_reddit_each", {
        keyword,
        max_count: 20,
      });
      setAnalysis(response.data.result); // 👈 只传 result 部分给组件
    } catch (err) {
      console.error(err);
      setError("Failed to analyze. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box maxWidth="800px" mx="auto" mt={4}>
      <Typography variant="h4" gutterBottom>
        Welcome{user ? `, ${user.username}` : ""}
      </Typography>
      <Typography variant="body1" gutterBottom>
        Enter a keyword to analyze sentiment:
      </Typography>

      <Box display="flex" gap={2} mt={2}>
        <TextField
          label="Keyword"
          fullWidth
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <Button variant="contained" onClick={handleAnalyze} disabled={loading}>
          Analyze
        </Button>
      </Box>

      {loading && (
        <Box mt={4} textAlign="center">
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Typography color="error" mt={2}>
          {error}
        </Typography>
      )}

      {analysis && <SentimentResult analysis={analysis} />}
    </Box>
  );
};

export default Home;

