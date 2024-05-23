import React, { useEffect, useState } from 'react';
import axios from '../../utils/AxiosInstance';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  Button ,
  Box
} from '@mui/material';

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('/getusers')
      .then(response => {
        setUsers(response.data.data);
      })
      .catch(error => {
        console.error('There was an error fetching the users!', error);
      });
  }, []);

  const toggleUserStatus = (userId, isDisabled) => {
    axios.put(`/setusermode/${userId}`, { isDisabled: !isDisabled })
      .then(response => {
        setUsers(users.map(user =>
          user._id === userId ? { ...user, isDisabled: !isDisabled } : user
        ));
      })
      .catch(error => {
        console.error('There was an error updating the user status!', error);
      });
  };

  return (
    <Box sx={{margin:'5%'}}>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Username</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users?.map((user) => (
            <TableRow key={user?._id}>
              <TableCell component="th" scope="row">
                {user?.username}
              </TableCell>
              <TableCell>{user?.email}</TableCell>
              <TableCell>{user.isDisabled ? 'Inactive' : 'Active'}</TableCell>
              <TableCell>
                <Button 
                  variant="contained" 
                  color={user?.isDisabled ? 'success' : 'error'}
                  onClick={() => toggleUserStatus(user?._id, user?.isDisabled)}
                >
                  {user?.isDisabled ? 'Activate' : 'Deactivate'}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Box>
  );
}
