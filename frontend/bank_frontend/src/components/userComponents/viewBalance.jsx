import React, { useEffect, useState } from 'react';
import axios from '../../utils/AxiosInstance';
import { Box, Typography, CircularProgress } from '@mui/material';

export default function ViewBalance() {
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const userId = localStorage.getItem("userId")
        const response = await axios.get(`/fetchbalance/${userId}`); 
        setBalance(response?.data?.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching balance:', err);
        setError('Failed to fetch balance');
        setLoading(false);
      }
    };

    fetchBalance();
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          flexDirection: 'column',
        }}
      >
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        flexDirection: 'column',
      }}
    >
      <Typography variant="h4" component="div" gutterBottom>
        Your Balance
      </Typography>
      <Typography variant="h6" component="div">
      ₹{balance}
      </Typography>
    </Box>
  );
}
