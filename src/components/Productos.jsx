import React, { useState, useEffect } from 'react';
import { getProductos, createProducto, updateProducto, deleteProducto } from '../api/productoApi';
import { Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, TextField, Typography, Grid, Box, IconButton, Card, CardContent } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [newProducto, setNewProducto] = useState({ nombre: '', precio: '', stock: '' });
  const [editing, setEditing] = useState(false);
  const [currentProducto, setCurrentProducto] = useState(null);

  useEffect(() => {
    fetchProductos();
  }, []);

  const fetchProductos = async () => {
    const data = await getProductos();
    setProductos(data);
  };

  const handleCreate = async () => {
    await createProducto(newProducto);
    fetchProductos();
    setNewProducto({ nombre: '', precio: '', stock: '' });
  };

  const handleEdit = (producto) => {
    setEditing(true);
    setCurrentProducto(producto);
    setNewProducto(producto);
  };

  const handleUpdate = async () => {
    await updateProducto(currentProducto.id_producto, newProducto);
    fetchProductos();
    setEditing(false);
    setCurrentProducto(null);
    setNewProducto({ nombre: '', precio: '', stock: '' });
  };

  const handleDelete = async (id) => {
    await deleteProducto(id);
    fetchProductos();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProducto({ ...newProducto, [name]: value });
  };

  return (
    <Container style={{ background: '#00808077'}}>
      <Typography variant="h4" component="h1" gutterBottom style={{color:'white'}}>
        Productos
      </Typography>
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField label="Nombre" name="nombre" value={newProducto.nombre} onChange={handleChange} fullWidth />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Precio" name="precio" value={newProducto.precio} onChange={handleChange} fullWidth />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Stock" name="stock" value={newProducto.stock} onChange={handleChange} fullWidth />
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
              <TableCell>Nombre</TableCell>
              <TableCell>Precio</TableCell>
              <TableCell>Stock</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {productos.map((producto) => (
              <TableRow key={producto.id_producto}>
                <TableCell>{producto.nombre}</TableCell>
                <TableCell>{producto.precio}</TableCell>
                <TableCell>{producto.stock}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => handleEdit(producto)} style={{ marginRight: '10px', background:'#fff'}}>
                    <Edit />
                  </IconButton>
                  <IconButton color="secondary" onClick={() => handleDelete(producto.id_producto)} style={{ background: '#fff' }}>
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

export default Productos;
