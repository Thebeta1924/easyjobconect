import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, CssBaseline, AppBar, Toolbar, Typography, Box, Button } from '@mui/material';
import { People, Home, ShoppingCart, Build, Person } from '@mui/icons-material';

const drawerWidth = 240;

const Layout = () => {
  const navigate = useNavigate();
  const userEmail = localStorage.getItem('userEmail');

  const handleLogout = () => {
    localStorage.removeItem('authenticated');
    localStorage.removeItem('userEmail');
    navigate('/');
  };

  return (
    <Box sx={{ display: 'flex' }} >
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: 1201, background:'#008080', width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}>
        <Toolbar >
          <Typography variant="h6" noWrap component="div" style={{ marginLeft:'500px', fontSize: 40 , color:'#fff'}}>
            EasyJob
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box', background:'#008080'},
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto', background:'#008080', color:'#fff'}}>
          <List >
            <ListItem button component={Link} to="/dashboard/clientes">
              <ListItemIcon><People /></ListItemIcon>
              <ListItemText primary="Clientes" />
            </ListItem>
            <ListItem button component={Link} to="/dashboard/empleados">
              <ListItemIcon><Person /></ListItemIcon>
              <ListItemText primary="Empleados" />
            </ListItem>
            <ListItem button component={Link} to="/dashboard/productos">
              <ListItemIcon><ShoppingCart /></ListItemIcon>
              <ListItemText primary="Productos" />
            </ListItem>
            <ListItem button component={Link} to="/dashboard/servicios">
              <ListItemIcon><Build /></ListItemIcon>
              <ListItemText primary="Servicios" />
            </ListItem>
            <ListItem button component={Link} to="/dashboard/users">
              <ListItemIcon><Home /></ListItemIcon>
              <ListItemText primary="Users" />
            </ListItem>
          </List>
          <Box sx={{ position: 'absolute', bottom: 16, width: '100%', textAlign: 'center'}}>
            <Button variant="contained" color="secondary" onClick={handleLogout}>
              Cerrar Sesión
            </Button>
            <Typography variant="body2" sx={{ mt: 1 }}>
              {userEmail}
            </Typography>
          </Box>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3, width: `calc(100% - ${drawerWidth}px)` }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
