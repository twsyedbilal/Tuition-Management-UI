import React from 'react';
import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';

import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';



const users = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
  { id: 2, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
  { id: 3, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
  { id: 4, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
  { id: 5, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },

];


const UserTable = () => {
  // const [selectedRole, setSelectedRole] = useState('');

  const [open, setOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [status, setStatus] = useState('');
  const [users, setUsers] = useState([]);
  

  const handleOpen = (user) => {
    if (user) {
      setEditingUser(user);
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
      setStatus(user.status);
    } else {
      setEditingUser(null);
      setName('');
      setEmail('');
      setRole('');
      setStatus('');
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    const updatedUser = {
      id: editingUser ? editingUser.id : Date.now(), // If editing, use existing ID; else generate a new one
      name,
      email,
      role,
      status,
    };

    if (editingUser) {
      // Update existing user
      // Replace the updated user in your data source
      const updatedUsers = users.map((user) =>
      user.id === editingUser.id ? { ...user, ...updatedUser } : user
    );
    setUsers(updatedUsers);
    } else {
      // Add new user
      // Add the new user to your data source
      setUsers([...users, updatedUser]); 
    }

    handleClose();
  };

  const handleDelete = (user) => {
    // Delete the user from your data source
    const updatedUsers = users.filter((u) => u.id !== user.id);
  setUsers(updatedUsers);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
      <Button variant="contained" color="primary"  onClick={() => handleOpen()}>
        Add User
      </Button>
      </div>
      
      <TableContainer component={Paper}>
        <Table aria-label="user table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
  {users.map((user) => (
    <TableRow key={user.id}>
      <TableCell>{user.id}</TableCell>
      <TableCell>{user.name}</TableCell>
      <TableCell>{user.email}</TableCell>
      <TableCell>{user.role}</TableCell>
      <TableCell>{user.status}</TableCell>
      <TableCell>
        <Button  onClick={() => handleOpen(user)}>
        <EditIcon />
        </Button>
        <Button  onClick={() => handleDelete(user)}>
        <DeleteIcon/>
        </Button>
      </TableCell>
    </TableRow>
  ))}
</TableBody>

        </Table>
      </TableContainer>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{editingUser ? 'Edit User' : 'Add User'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            margin="dense"
            id="email"
            label="Email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

            <FormControl fullWidth margin="dense">
    <InputLabel id="role-label">Role</InputLabel>
    <Select
      labelId="role-label"
      id="role"
      value={role}
      onChange={(e) => setRole(e.target.value)}
    >
      <MenuItem value="Admin">Admin</MenuItem>
      <MenuItem value="Teacher">Teacher</MenuItem>
      <MenuItem value="Accountant">Accountant</MenuItem>
    </Select>
      (
          user.role 
        )
  </FormControl>
  
          <TextField
            margin="dense"
            id="status"
            label="Status"
            fullWidth
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            {editingUser ? 'Save' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UserTable;
