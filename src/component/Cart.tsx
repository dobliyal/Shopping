import React from 'react';
import { useCart } from '../context/CartContext';
import CartItem from './CartItem';
import  Box  from '@mui/material/Box';
const Cart: React.FC = () => {
  const { state, clearCart } = useCart();
  const totalPrice = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div>
      {state.items.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        
        <Box sx={{ p: 2 }}>
      <button onClick={clearCart}>Clear Cart</button>
          {state.items.map(item => (
            <CartItem key={item.id} item={item} />
          ))}
          <div>
            <p>Total Price: ${totalPrice.toFixed(2)}</p>
          </div>
        </Box>
      )}
    </div>
  );
};

export default Cart;

