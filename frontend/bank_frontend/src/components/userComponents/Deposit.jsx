import React, { useState } from 'react';
import axios from '../../utils/AxiosInstance';
import { Box, TextField, Button, Typography } from '@mui/material';

export default function Deposit() {
  const [amount, setAmount] = useState();

  const handleDeposit = async () => {
    try {
        const userId = localStorage.getItem("userId");
      const response = await axios.post(`/depositamount/${userId}`,{ amount: parseFloat(amount) });
      console.log(response.data);
      alert('Deposit successful');
      setAmount(''); 
    } catch (error) {
      console.error('There was an error depositing the money!', error);
      alert('Deposit failed');
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 8,
        padding: 3,
        border: '1px solid #ccc',
        borderRadius: 2,
        boxShadow: 3,
        width: 300,
        mx: 'auto',
      }}
    >
      <Typography variant="h5" component="div" gutterBottom>
        Deposit Money
      </Typography>
      <TextField
        label="Amount"
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        variant="outlined"
        fullWidth
        margin="normal"
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleDeposit}
        sx={{ marginTop: 2 }}
      >
        Deposit
      </Button>
    </Box>
  );
}

