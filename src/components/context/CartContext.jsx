import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios'; // ✅ make sure axios is imported

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const storedCart = localStorage.getItem('cartItems');
    return storedCart ? JSON.parse(storedCart) : [];
  });

  // Sync cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  // ✅ Properly placed inside the component
  const refreshCart = async (userId) => {
    try {
      const res = await axios.get(`http://localhost:3000/api/tradecart/${userId}`);
      setCartItems(res.data); // assumes the backend returns cart items
    } catch (err) {
      console.error('Failed to refresh cart:', err);
    }
  };

  const addToCart = (item) => {
    setCartItems(prevCartItems => {
      const existing = prevCartItems.find(i => i.id === item.id);
      if (existing) {
        return prevCartItems.map(i =>
          i.id === item.id
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        );
      } else {
        return [...prevCartItems, item];
      }
    });
  };

  const updateQuantity = (productId, quantity) => {
    setCartItems(prevCartItems =>
      prevCartItems.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const incrementQuantity = (productId) => {
    setCartItems(prevCartItems =>
      prevCartItems.map(item =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decrementQuantity = (productId) => {
    setCartItems(prevCartItems =>
      prevCartItems.map(item =>
        item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
      )
    );
  };

  const removeFromCart = (productId) => {
    setCartItems(prevCartItems =>
      prevCartItems.filter(item => item.id !== productId)
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getTotal = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQuantity,
        incrementQuantity,
        decrementQuantity,
        removeFromCart,
        clearCart,
        getTotalPrice,
        getTotal,
        refreshCart, // ✅ now correctly included
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
