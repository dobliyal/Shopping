import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../api/productApi';
import { useCart } from '../context/CartContext';
import { Product, CartItem } from '../types';
import { Box } from '@mui/system';

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const { state, addItem, removeItem } = useCart();
  const[loading,setloading]=useState(false);
  
  useEffect(() => {
    const getProducts = async () => {
      setloading(true)
      const products = await fetchProducts();
      setloading(false)
      setProducts(products);
    };
    getProducts();
  }, []);

  const isInCart = (id: number) => {
    return state.items.some(item => item.id === id);
  };

  const handleAddItem = (product: Product) => {
    const cartItem: CartItem = { ...product, quantity: 1 };
    addItem(cartItem);
  };

  console.log('CartContext:', state);

  return loading?(<>Loading..</>):(
    <Box sx={{ p: 2 }}>
      {products.map(product => (
        <Box
          key={product.id}
          sx={{ 
            paddingLeft: 2,
            border: '1px solid #ccc',
            marginBottom: 2,
            padding: 2,
            borderRadius: 1
          }}
        >
          <img style={{ width: '10%' }} src={product.image} alt={product.title} />
          <h3>{product.title}</h3>
          <p>{product.description}</p>
          <p>${product.price}</p>
          {isInCart(product.id) ? (
            <button onClick={() => removeItem(product.id)}>Remove from Cart</button>
          ) : (
            <button onClick={() => handleAddItem(product)}>Add to Cart</button>
          )}
        </Box>
      ))}
    </Box>
  );
};

export default ProductList;
