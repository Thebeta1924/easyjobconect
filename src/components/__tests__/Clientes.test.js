// src/components/__tests__/Clientes.test.js

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Clientes from '../Clientes';

// Mock de las funciones de API
jest.mock('../../api/clienteApi', () => ({
  getClientes: jest.fn(),
  createCliente: jest.fn(),
  updateCliente: jest.fn(),
  deleteCliente: jest.fn(),
}));

import { getClientes, createCliente, updateCliente, deleteCliente } from '../../api/clienteApi';

describe('Clientes Component', () => {
  beforeEach(() => {
    // Resetea los mocks antes de cada prueba
    getClientes.mockClear();
    createCliente.mockClear();
    updateCliente.mockClear();
    deleteCliente.mockClear();
  });

  it('should render without crashing and fetch clients', async () => {
    // Mock de datos de clientes
    const clientesMock = [
      { id_cliente: 1, nombre: 'Juan', email: 'juan@example.com', celular: '123456789', documento: 'ABC123', direccion: 'Calle 123' },
    ];

    // Configurar el mock para que getClientes devuelva los datos mockeados
    getClientes.mockResolvedValueOnce(clientesMock);

    // Renderizar el componente
    render(<Clientes />);

    // Verificar que el título esté en el documento
    expect(screen.getByText(/Clientes/i)).toBeInTheDocument();

    // Esperar a que los clientes sean cargados y se muestren en la tabla
    await waitFor(() => {
      expect(screen.getByText(/Juan/i)).toBeInTheDocument();
      expect(screen.getByText(/juan@example.com/i)).toBeInTheDocument();
    });

    // Verificar que se haya llamado a getClientes
    expect(getClientes).toHaveBeenCalledTimes(1);
  });

  it('should create a new client', async () => {
    // Configurar el mock de getClientes para que devuelva un array vacío inicialmente
    getClientes.mockResolvedValueOnce([]);
    
    // Renderizar el componente
    render(<Clientes />);

    // Completar los campos del formulario
    fireEvent.change(screen.getByLabelText(/Nombre/i), { target: { value: 'Pedro' } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'pedro@example.com' } });
    fireEvent.change(screen.getByLabelText(/Celular/i), { target: { value: '987654321' } });
    fireEvent.change(screen.getByLabelText(/Documento/i), { target: { value: 'XYZ789' } });
    fireEvent.change(screen.getByLabelText(/Dirección/i), { target: { value: 'Avenida 456' } });
    fireEvent.change(screen.getByLabelText(/Contraseña/i), { target: { value: 'password123' } });

    // Mock para crear cliente
    createCliente.mockResolvedValueOnce({});

    // Click en el botón de crear
    fireEvent.click(screen.getByText(/Crear/i));

    // Esperar a que la función de creación sea llamada
    await waitFor(() => {
      expect(createCliente).toHaveBeenCalledWith({
        nombre: 'Pedro',
        email: 'pedro@example.com',
        celular: '987654321',
        documento: 'XYZ789',
        direccion: 'Avenida 456',
        contrasena: 'password123',
      });

      // Verificar que se haya llamado a fetchClientes después de crear el cliente
      expect(getClientes).toHaveBeenCalledTimes(2);
    });
  });
});
