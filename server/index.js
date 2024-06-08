import express from 'express';
import cors from 'cors';
import mysql from 'mysql2/promise';

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const db = await mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // Sin contraseña
  database: 'easyjob'
});

// Endpoints for "cliente"
app.get('/api/clientes', async (req, res) => {
  try {
    const [results] = await db.query('SELECT * FROM cliente');
    res.json(results);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post('/api/clientes', async (req, res) => {
  try {
    const newCliente = req.body;
    const [results] = await db.query('INSERT INTO cliente SET ?', newCliente);
    res.json(results);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.put('/api/clientes/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const updatedCliente = req.body;
    const [results] = await db.query('UPDATE cliente SET ? WHERE id_cliente = ?', [updatedCliente, id]);
    res.json(results);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.delete('/api/clientes/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const [results] = await db.query('DELETE FROM cliente WHERE id_cliente = ?', [id]);
    res.json(results);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Endpoints for "empleados"
app.get('/api/empleados', async (req, res) => {
  try {
    const [results] = await db.query('SELECT * FROM empleados');
    res.json(results);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post('/api/empleados', async (req, res) => {
  try {
    const newEmpleado = req.body;
    const [results] = await db.query('INSERT INTO empleados SET ?', newEmpleado);
    res.json(results);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.put('/api/empleados/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const updatedEmpleado = req.body;
    const [results] = await db.query('UPDATE empleados SET ? WHERE id = ?', [updatedEmpleado, id]);
    res.json(results);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.delete('/api/empleados/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const [results] = await db.query('DELETE FROM empleados WHERE id = ?', [id]);
    res.json(results);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Endpoints for "productos"
app.get('/api/productos', async (req, res) => {
  try {
    const [results] = await db.query('SELECT * FROM productos');
    res.json(results);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post('/api/productos', async (req, res) => {
  try {
    const newProducto = req.body;
    const [results] = await db.query('INSERT INTO productos SET ?', newProducto);
    res.json(results);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.put('/api/productos/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const updatedProducto = req.body;
    const [results] = await db.query('UPDATE productos SET ? WHERE id_producto = ?', [updatedProducto, id]);
    res.json(results);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.delete('/api/productos/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const [results] = await db.query('DELETE FROM productos WHERE id_producto = ?', [id]);
    res.json(results);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Endpoints for "servicios"
app.get('/api/servicios', async (req, res) => {
  try {
    const [results] = await db.query('SELECT * FROM servicios');
    res.json(results);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post('/api/servicios', async (req, res) => {
  try {
    const newServicio = req.body;
    const [results] = await db.query('INSERT INTO servicios SET ?', newServicio);
    res.json(results);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.put('/api/servicios/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const updatedServicio = req.body;
    const [results] = await db.query('UPDATE servicios SET ? WHERE servicioid = ?', [updatedServicio, id]);
    res.json(results);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.delete('/api/servicios/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const [results] = await db.query('DELETE FROM servicios WHERE servicioid = ?', [id]);
    res.json(results);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Endpoints for "users"
app.get('/api/users', async (req, res) => {
  try {
    const [results] = await db.query('SELECT * FROM users');
    res.json(results);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post('/api/users', async (req, res) => {
  try {
    const newUser = req.body;
    const [results] = await db.query('INSERT INTO users SET ?', newUser);
    res.json(results);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.put('/api/users/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const updatedUser = req.body;
    const [results] = await db.query('UPDATE users SET ? WHERE id = ?', [updatedUser, id]);
    res.json(results);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.delete('/api/users/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const [results] = await db.query('DELETE FROM users WHERE id = ?', [id]);
    res.json(results);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
