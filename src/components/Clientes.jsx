import React, { useState, useEffect } from 'react';
import { getClientes, createCliente, updateCliente, deleteCliente } from '../api/clienteApi';
import { Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, TextField, Typography, Grid, Box, IconButton, Card, CardContent } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';


const Clientes = () => {
  const [clientes, setClientes] = useState([]);
  const [newCliente, setNewCliente] = useState({ nombre: '', email: '', celular: '', documento: '', direccion: '', contrasena: '' });
  const [editing, setEditing] = useState(false);
  const [currentCliente, setCurrentCliente] = useState(null);

  useEffect(() => {
    fetchClientes();
  }, []);

  const fetchClientes = async () => {
    const data = await getClientes();
    setClientes(data);
  };

  const handleCreate = async () => {
    await createCliente(newCliente);
    fetchClientes();
    setNewCliente({ nombre: '', email: '', celular: '', documento: '', direccion: '', contrasena: '' });
  };

  const handleEdit = (cliente) => {
    setEditing(true);
    setCurrentCliente(cliente);
    setNewCliente(cliente);
  };

  const handleUpdate = async () => {
    await updateCliente(currentCliente.id_cliente, newCliente);
    fetchClientes();
    setEditing(false);
    setCurrentCliente(null);
    setNewCliente({ nombre: '', email: '', celular: '', documento: '', direccion: '', contrasena: '' });
  };

  const handleDelete = async (id) => {
    await deleteCliente(id);
    fetchClientes();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCliente({ ...newCliente, [name]: value });
  };

  return (
    <Container style={{ background: '#00808077'}}>
      <Typography variant="h4" component="h1" gutterBottom style={{color:'white'}}>
        Clientes
      </Typography>
      <Card sx={{ mb: 3 }}>
        <CardContent style={{ background: '#fff'}}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField label="Nombre" name="nombre" value={newCliente.nombre} onChange={handleChange} fullWidth />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Email" name="email" value={newCliente.email} onChange={handleChange} fullWidth />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Celular" name="celular" value={newCliente.celular} onChange={handleChange} fullWidth />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Documento" name="documento" value={newCliente.documento} onChange={handleChange} fullWidth />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Dirección" name="direccion" value={newCliente.direccion} onChange={handleChange} fullWidth />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Contraseña" name="contrasena" value={newCliente.contrasena} onChange={handleChange} fullWidth />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" onClick={editing ? handleUpdate : handleCreate}>
                {editing ? 'Actualizar' : 'Crear'}
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <TableContainer component={Paper} style={{ background: '#0885' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Celular</TableCell>
              <TableCell>Documento</TableCell>
              <TableCell>Dirección</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {clientes.map((cliente) => (
              <TableRow key={cliente.id_cliente}>
                <TableCell>{cliente.nombre}</TableCell>
                <TableCell>{cliente.email}</TableCell>
                <TableCell>{cliente.celular}</TableCell>
                <TableCell>{cliente.documento}</TableCell>
                <TableCell>{cliente.direccion}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => handleEdit(cliente)} style={{ marginRight: '10px', background: '#fff' }}>
                    <Edit />
                  </IconButton>
                  <IconButton color="secondary" onClick={() => handleDelete(cliente.id_cliente)} style={{ background: '#fff' }}>
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

export default Clientes;
