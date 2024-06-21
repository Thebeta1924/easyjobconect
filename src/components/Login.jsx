import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Paper, Avatar, Typography, TextField, Button, Box, CssBaseline } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const backgroundImageUrl = '/public/fondo5_login.webp';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (email === 'miguelangelbeltranrache11@gmail.com' && password === 'miguel123', email === 'juancif@gmail.com' && password === 'juan123') {
      localStorage.setItem('authenticated', 'true');
      localStorage.setItem('userEmail', email);  // Almacenar el correo del usuario
      navigate('/dashboard');
    } else {
      alert('Credenciales incorrectas');
    }
  };

  return (
    <Box
      sx={{
        backgroundImage: `url(${backgroundImageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
      }}
    >
      <CssBaseline />
      <Container  
        component="main"
        maxWidth="xs"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          padding: 0,
        }}
      >
        <Paper
          elevation={10}
          sx={{
            padding: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            background: 'transparent',
            backdropFilter: 'blur(10px)',
            borderRadius: 2,
            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
            minWidth: '300px',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor:"transparent", 
          }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" sx={{ fontWeight: 'bold' }}>
            Ingreso
          </Typography>
          <Box component="form" sx={{ mt: 1 }}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              placeholder="Correo Electrónico"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              InputLabelProps={{ style: { color: '#333' , background:"#ddd"} }}
              InputProps={{ style: { color: '#333', background:"#ddd"} }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              placeholder="Contraseña"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputLabelProps={{ style: { color: '#333', background:"#ddd" } }}
              InputProps={{ style: { color: '#333' , background:"#ddd", border: '5px' } }}
            />
            <Button
              background-color="red"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2, fontWeight: 'bold', padding: 1.5 }}
              onClick={handleLogin}
            >
              Ingresar
            </Button>

          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;
