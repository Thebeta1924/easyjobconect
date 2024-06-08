import React, { useState, useEffect } from 'react';
import { getServicios, createServicio, updateServicio, deleteServicio } from '../api/servicioApi';
import { Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, TextField, Typography, Grid, Box, IconButton, Card, CardContent } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

const Servicios = () => {
  const [servicios, setServicios] = useState([]);
  const [newServicio, setNewServicio] = useState({ servicio: '', nombre: '', tarifa: '' });
  const [editing, setEditing] = useState(false);
  const [currentServicio, setCurrentServicio] = useState(null);

  useEffect(() => {
    fetchServicios();
  }, []);

  const fetchServicios = async () => {
    const data = await getServicios();
    setServicios(data);
  };

  const handleCreate = async () => {
    await createServicio(newServicio);
    fetchServicios();
    setNewServicio({ servicio: '', nombre: '', tarifa: '' });
  };

  const handleEdit = (servicio) => {
    setEditing(true);
    setCurrentServicio(servicio);
    setNewServicio(servicio);
  };

  const handleUpdate = async () => {
    await updateServicio(currentServicio.servicioid, newServicio);
    fetchServicios();
    setEditing(false);
    setCurrentServicio(null);
    setNewServicio({ servicio: '', nombre: '', tarifa: '' });
  };

  const handleDelete = async (id) => {
    await deleteServicio(id);
    fetchServicios();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewServicio({ ...newServicio, [name]: value });
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Servicios
      </Typography>
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField label="Servicio" name="servicio" value={newServicio.servicio} onChange={handleChange} fullWidth />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Nombre" name="nombre" value={newServicio.nombre} onChange={handleChange} fullWidth />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Tarifa" name="tarifa" value={newServicio.tarifa} onChange={handleChange} fullWidth />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" onClick={editing ? handleUpdate : handleCreate}>
                {editing ? 'Actualizar' : 'Crear'}
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Servicio</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Tarifa</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {servicios.map((servicio) => (
              <TableRow key={servicio.servicioid}>
                <TableCell>{servicio.servicio}</TableCell>
                <TableCell>{servicio.nombre}</TableCell>
                <TableCell>{servicio.tarifa}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => handleEdit(servicio)} style={{ marginRight: '10px' }}>
                    <Edit />
                  </IconButton>
                  <IconButton color="secondary" onClick={() => handleDelete(servicio.servicioid)}>
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

export default Servicios;
