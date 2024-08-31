import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Clientes from './components/Clientes';
import Empleados from './components/Empleados';
import Productos from './components/Productos';
import Servicios from './components/Servicios';
import Users from './components/Users';
import Login from './components/Login';

import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route path="clientes" element={<Clientes /> } />
        <Route path="empleados" element={<Empleados />} />
        <Route path="productos" element={<Productos />} />
        <Route path="servicios" element={<Servicios />} />
        <Route path="users" element={<Users />} />
      </Route>
    </Routes>
  );
};

export default App;
