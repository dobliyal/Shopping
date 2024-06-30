import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import localforage from 'localforage';
import { CartItem } from '../types';
import { CartState } from '../types';
import { CartContextProps } from '../types';

const CartContext = createContext<CartContextProps | undefined>(undefined);

const cartReducer = (state: CartState, action: any): CartState => {
  switch (action.type) {
    case 'ADD_ITEM':
      return { ...state, items: [...state.items, { ...action.item, quantity: 1 }] };
    case 'REMOVE_ITEM':
      const filteredItems = state.items.filter(item => item.id !== action.id);
      return { ...state, items: filteredItems };
    case 'CLEAR_CART':
      return { ...state, items: [] };
    case 'SET_ITEMS':
      return { ...state, items: action.items };
    default:
      return state;
  }
};

const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

//cart se  old data nikalne ke liye 
useEffect(() => {
    (async () => {
      const items = await localforage.getItem<CartItem[]>('cartItems');
      if (items) {
        dispatch({ type: 'SET_ITEMS', items });
      }
    })();
  }, []);
  
//data ko indexdb mai save karne ke liye
useEffect(() => {
    localforage.setItem('cartItems', state.items);
  }, [state.items]);
  

  const addItem = (item: CartItem) => dispatch({ type: 'ADD_ITEM', item });
  const removeItem = (id: number) => dispatch({ type: 'REMOVE_ITEM', id });
  const clearCart = () => dispatch({ type: 'CLEAR_CART' });

  return (
    <CartContext.Provider value={{ state, addItem, removeItem, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export { CartProvider, useCart };
