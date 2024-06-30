export interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    image: string;
  }
  
  export interface CartItem extends Product {
    quantity: number;
  }
   export interface CartState {
    items: CartItem[];
  }
  
  export interface CartContextProps {
    state: CartState;
    addItem: (item: CartItem) => void;
    removeItem: (id: number) => void;
    clearCart: () => void;
  }
  export interface CartItemProps {
    item: {
      id: number;
      title: string;
      price: number;
      image: string;
      quantity: number;
    };
  }
  