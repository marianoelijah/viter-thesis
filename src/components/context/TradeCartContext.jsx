// TradeCartContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';

const TradeCartContext = createContext();

export const TradeCartProvider = ({ children }) => {
  const [tradeCart, setTradeCart] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('tradeCart')) || [];
    setTradeCart(storedCart);
  }, []);

  useEffect(() => {
    localStorage.setItem('tradeCart', JSON.stringify(tradeCart));
  }, [tradeCart]);

  const getTradeTotalItems = () => {
  return tradeCart.reduce((total, item) => total + item.quantity, 0);
};

const updateTradeQuantity = (id, quantity) => {
    setTradeCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearTradeCart = () => {
    setTradeCart([]);
  };

//   const addToTradeCart = (product) => {
//     setTradeCart(prev => [...prev, product]);
//   };

  const removeFromTradeCart = (productId) => {
    setTradeCart(prev => prev.filter(p => p.id !== productId));
  };

  const addToTradeCart = (item) => {
    setTradeCart((prevCart) => {
      const existingItem = prevCart.find((i) => i.id === item.id);
      if (existingItem) {
        return prevCart.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
  };

  return (
    <TradeCartContext.Provider value={{ tradeCart, addToTradeCart, removeFromTradeCart, clearTradeCart, updateTradeQuantity, getTradeTotalItems }}>
      {children}
    </TradeCartContext.Provider>
  );
};

export const useTradeCart = () => {
  const context = useContext(TradeCartContext);
  if (!context) {
    throw new Error("useTradeCart must be used within a TradeCartProvider");
  }
  return context;
};
