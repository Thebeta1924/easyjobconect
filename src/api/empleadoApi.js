import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001/api'
});

export const getEmpleados = async () => {
  const response = await api.get('/empleados');
  return response.data;
};

export const createEmpleado = async (empleado) => {
  const response = await api.post('/empleados', empleado);
  return response.data;
};

export const updateEmpleado = async (id, empleado) => {
  const response = await api.put(`/empleados/${id}`, empleado);
  return response.data;
};

export const deleteEmpleado = async (id) => {
  const response = await api.delete(`/empleados/${id}`);
  return response.data;
};
