import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const storedCart = localStorage.getItem('cartItems');
    return storedCart ? JSON.parse(storedCart) : [];
  });

  const [tradeCartItems, setTradeCartItems] = useState(() => {
    const storedTradeCart = localStorage.getItem('tradeCartItems');
    return storedTradeCart ? JSON.parse(storedTradeCart) : [];
  });

  // Sync Buy Cart
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  // Sync Trade Cart
  useEffect(() => {
    localStorage.setItem('tradeCartItems', JSON.stringify(tradeCartItems));
  }, [tradeCartItems]);

  // BUY CART FUNCTIONS
  const refreshCart = async (userId) => {
    try {
      const res = await axios.get(`http://localhost:3000/api/tradecart/${userId}`);
      setCartItems(res.data);
    } catch (err) {
      console.error('Failed to refresh cart:', err);
    }
  };

  const addToCart = (item) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.id === item.id);
      return existing
        ? prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i)
        : [...prev, item];
    });
  };

  const updateQuantity = (id, quantity) => {
    setCartItems(prev =>
      prev.map(item => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const incrementQuantity = (id) => {
    setCartItems(prev =>
      prev.map(item => (item.id === id ? { ...item, quantity: item.quantity + 1 } : item))
    );
  };

  const decrementQuantity = (id) => {
    setCartItems(prev =>
      prev.map(item => (item.id === id ? { ...item, quantity: item.quantity - 1 } : item))
    );
  };

  const removeFromCart = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => setCartItems([]);

  const getTotalPrice = () => cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const getTotal = () => cartItems.reduce((total, item) => total + item.quantity, 0);

  // TRADE CART FUNCTIONS
  const addToTradeCart = (item) => {
    setTradeCartItems(prev => {
      const exists = prev.find(i => i.id === item.id);
      return exists
        ? prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i)
        : [...prev, item];
    });
  };

  const updateTradeQuantity = (id, quantity) => {
    setTradeCartItems(prev =>
      prev.map(item => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const removeFromTradeCart = (id) => {
    setTradeCartItems(prev => prev.filter(item => item.id !== id));
  };

  const clearTradeCart = () => setTradeCartItems([]);

  const getTradeTotalItems = () => tradeCartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        // BUY CART
        cartItems,
        addToCart,
        updateQuantity,
        incrementQuantity,
        decrementQuantity,
        removeFromCart,
        clearCart,
        getTotalPrice,
        getTotal,
        refreshCart,

        // TRADE CART
        tradeCartItems,
        addToTradeCart,
        updateTradeQuantity,
        removeFromTradeCart,
        clearTradeCart,
        getTradeTotalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
