import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001/api'
});

export const getServicios = async () => {
  const response = await api.get('/servicios');
  return response.data;
};

export const createServicio = async (servicio) => {
  const response = await api.post('/servicios', servicio);
  return response.data;
};

export const updateServicio = async (id, servicio) => {
  const response = await api.put(`/servicios/${id}`, servicio);
  return response.data;
};

export const deleteServicio = async (id) => {
  const response = await api.delete(`/servicios/${id}`);
  return response.data;
};
