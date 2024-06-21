import React, { useState, useEffect } from 'react';
import { getEmpleados, createEmpleado, updateEmpleado, deleteEmpleado } from '../api/empleadoApi';
import { Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, TextField, Typography, Grid, Box, IconButton, Card, CardContent } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

const Empleados = () => {
  const [empleados, setEmpleados] = useState([]);
  const [newEmpleado, setNewEmpleado] = useState({ identificacion: '', nombre: '', apellido: '', direccion: '', telefono: '', fecha_nacimiento: '' });
  const [editing, setEditing] = useState(false);
  const [currentEmpleado, setCurrentEmpleado] = useState(null);

  useEffect(() => {
    fetchEmpleados();
  }, []);

  const fetchEmpleados = async () => {
    const data = await getEmpleados();
    setEmpleados(data);
  };

  const handleCreate = async () => {
    await createEmpleado(newEmpleado);
    fetchEmpleados();
    setNewEmpleado({ identificacion: '', nombre: '', apellido: '', direccion: '', telefono: '', fecha_nacimiento: '' });
  };

  const handleEdit = (empleado) => {
    setEditing(true);
    setCurrentEmpleado(empleado);
    setNewEmpleado(empleado);
  };

  const handleUpdate = async () => {
    await updateEmpleado(currentEmpleado.id, newEmpleado);
    fetchEmpleados();
    setEditing(false);
    setCurrentEmpleado(null);
    setNewEmpleado({ identificacion: '', nombre: '', apellido: '', direccion: '', telefono: '', fecha_nacimiento: '' });
  };

  const handleDelete = async (id) => {
    await deleteEmpleado(id);
    fetchEmpleados();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewEmpleado({ ...newEmpleado, [name]: value });
  };

  return (
    <Container style={{ background: '#00808077'}}>
      <Typography variant="h4" component="h1" gutterBottom style={{color:'white'}}>
        Empleados
      </Typography>
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField label="Identificación" name="identificacion" value={newEmpleado.identificacion} onChange={handleChange} fullWidth />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Nombre" name="nombre" value={newEmpleado.nombre} onChange={handleChange} fullWidth />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Apellido" name="apellido" value={newEmpleado.apellido} onChange={handleChange} fullWidth />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Dirección" name="direccion" value={newEmpleado.direccion} onChange={handleChange} fullWidth />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Teléfono" name="telefono" value={newEmpleado.telefono} onChange={handleChange} fullWidth />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Fecha de Nacimiento" name="fecha_nacimiento" value={newEmpleado.fecha_nacimiento} onChange={handleChange} fullWidth type="date" InputLabelProps={{ shrink: true }} />
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
              <TableCell>Identificación</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Apellido</TableCell>
              <TableCell>Dirección</TableCell>
              <TableCell>Teléfono</TableCell>
              <TableCell>Fecha de Nacimiento</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {empleados.map((empleado) => (
              <TableRow key={empleado.id}>
                <TableCell>{empleado.identificacion}</TableCell>
                <TableCell>{empleado.nombre}</TableCell>
                <TableCell>{empleado.apellido}</TableCell>
                <TableCell>{empleado.direccion}</TableCell>
                <TableCell>{empleado.telefono}</TableCell>
                <TableCell>{empleado.fecha_nacimiento}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => handleEdit(empleado)} style={{ marginRight: '10px', background: '#fff'}}>
                    <Edit />
                  </IconButton>
                  <IconButton color="secondary" onClick={() => handleDelete(empleado.id)} style={{ background: '#fff' }}>
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

export default Empleados;
