import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../api/productApi';
import { useCart } from '../context/CartContext';
import { Product, CartItem } from '../types';
import { Box } from '@mui/system';
import ContentLoader from 'react-content-loader';

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const { state, addItem, removeItem } = useCart();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true);
        const products = await fetchProducts();
        setLoading(false);
        setProducts(products);
      } catch (error) {
        console.error('Failed to fetch products:', error);
        setLoading(false); 
      }
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

  const ProductLoader = () => 
    (
    <ContentLoader
      speed={20}
      width={400}
      height={160}
      viewBox="0 0 400 160"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    >
      <rect x="10" y="10" rx="5" ry="5" width="80" height="80" />
      <rect x="100" y="10" rx="5" ry="5" width="250" height="10" />
      <rect x="100" y="30" rx="5" ry="5" width="200" height="10" />
      <rect x="100" y="50" rx="5" ry="5" width="180" height="10" />
      <rect x="100" y="70" rx="5" ry="5" width="220" height="10" />
    </ContentLoader>
  );

  console.log('CartContext:', state);

  return (
    <Box sx={{ p: 2 }}>
      {loading ? (
        <Box>
          <ProductLoader />
          <ProductLoader />
          <ProductLoader />
        </Box>
      ) : (
        products.map(product => (
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
        ))
      )}
    </Box>
  );
};

export default ProductList;
