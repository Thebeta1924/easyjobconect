import React, { useState, useEffect } from 'react';
import { getUsers, createUser, updateUser, deleteUser } from '../api/userApi';
import { Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, TextField, Typography, Grid, Box, IconButton, Card, CardContent } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ fullname: '', email: '', telephone: '', document: '', direction: '', password: '', especiality: '', username: '', secretpin: '' });
  const [editing, setEditing] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const data = await getUsers();
    setUsers(data);
  };

  const handleCreate = async () => {
    await createUser(newUser);
    fetchUsers();
    setNewUser({ fullname: '', email: '', telephone: '', document: '', direction: '', password: '', especiality: '', username: '', secretpin: '' });
  };

  const handleEdit = (user) => {
    setEditing(true);
    setCurrentUser(user);
    setNewUser(user);
  };

  const handleUpdate = async () => {
    await updateUser(currentUser.id, newUser);
    fetchUsers();
    setEditing(false);
    setCurrentUser(null);
    setNewUser({ fullname: '', email: '', telephone: '', document: '', direction: '', password: '', especiality: '', username: '', secretpin: '' });
  };

  const handleDelete = async (id) => {
    await deleteUser(id);
    fetchUsers();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  return (
    <Container style={{ background: '#00808077'}}>
      <Typography variant="h4" component="h1" gutterBottom style={{color:'white'}}>
        Users
      </Typography>
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField label="Nombre Completo" name="fullname" value={newUser.fullname} onChange={handleChange} fullWidth />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Email" name="email" value={newUser.email} onChange={handleChange} fullWidth />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Teléfono" name="telephone" value={newUser.telephone} onChange={handleChange} fullWidth />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Documento" name="document" value={newUser.document} onChange={handleChange} fullWidth />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Dirección" name="direction" value={newUser.direction} onChange={handleChange} fullWidth />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Contraseña" name="password" value={newUser.password} onChange={handleChange} fullWidth />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Especialidad" name="especiality" value={newUser.especiality} onChange={handleChange} fullWidth />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Nombre de Usuario" name="username" value={newUser.username} onChange={handleChange} fullWidth />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="PIN Secreto" name="secretpin" value={newUser.secretpin} onChange={handleChange} fullWidth />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" onClick={editing ? handleUpdate : handleCreate}>
                {editing ? 'Actualizar' : 'Crear'}
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <TableContainer component={Paper} style={{ background: '#00808077'}}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre Completo</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Teléfono</TableCell>
              <TableCell>Documento</TableCell>
              <TableCell>Dirección</TableCell>
              <TableCell>Especialidad</TableCell>
              <TableCell>Nombre de Usuario</TableCell>
              <TableCell>PIN Secreto</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.fullname}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.telephone}</TableCell>
                <TableCell>{user.document}</TableCell>
                <TableCell>{user.direction}</TableCell>
                <TableCell>{user.especiality}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.secretpin}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => handleEdit(user)} style={{ marginRight: '10px', background:'#fff' }}>
                    <Edit />
                  </IconButton>
                  <IconButton color="secondary" onClick={() => handleDelete(user.id)} style={{ background: '#fff' }}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Users;
