import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import  AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Badge  from '@mui/material/Badge';

import Box from '@mui/material/Box';
const Header: React.FC = () => {
  const { state } = useCart();
  const itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Shopping Cart App
        </Typography>
        <Button color="inherit" component={Link} to="/">
          Products
        </Button>
        <Button color="inherit" component={Link} to="/cart">
          Cart  
          <Box component="span" sx={{ml:1}}>
          <Badge badgeContent={itemCount} color="secondary" />
          </Box>
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
