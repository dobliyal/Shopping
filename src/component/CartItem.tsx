import React from 'react';
import { useCart } from '../context/CartContext';
import { Box } from '@mui/material';
import {CartItemProps} from '../types'

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { removeItem } = useCart();

  return (
    < Box sx={{ 
      border: '2px solid #ccc',
      marginBottom: 2,
      padding: 2,
      borderRadius: 1
    }}>
      <img style={{ width: '10%' }}  src={item.image} alt={item.title} />
      <div>
        <h3>{item.title}</h3>
        <p>${item.price} x {item.quantity}</p>
      </div>
      <button onClick={() => removeItem(item.id)}>Remove</button>
    </Box>
  );
};

export default CartItem;

