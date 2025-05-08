import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import logo from '../assets/karangos-logo-600px.png'

export default function TopBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          
          <Box>
            <img 
              src={logo} alt="Logotipo Karangos"
              style={{ width: '300px' }} 
            />
          </Box>

        </Toolbar>
      </AppBar>
    </Box>
  );
}
