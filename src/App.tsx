import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';
import ProductListingPage from './Page/ProductListingPage';
import CartPage from './Page/CartPage';
import { CartProvider } from './context/CartContext';
function App() {
  return (
    <CartProvider>
   <Router>
      <Routes>
      <Route path="/" element={<ProductListingPage />} />
      <Route path="/cart" element={<CartPage />} />
      </Routes>
    </Router>
    </CartProvider>
  );
}

export default App;
