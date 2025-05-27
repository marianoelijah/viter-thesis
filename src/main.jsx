// src/main.jsx
import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthContext } from './context/AuthContext'; // Adjust path if needed
import { CartProvider } from '@/components/context/CartContext'; // Adjust path if needed
import { TradeCartProvider } from './components/context/TradeCartContext.jsx';

// Auth Context Wrapper
function AuthProviderWrapper({ children }) {
  const [userId, setUserId] = useState(null); // Starts as null
  return (
    <AuthContext.Provider value={{ userId, setUserId }}>
      {children}
    </AuthContext.Provider>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProviderWrapper>
        <TradeCartProvider>
        <CartProvider>
            <App />
        </CartProvider>
        </TradeCartProvider>
        <Toaster position="top-right" reverseOrder={false} />
      </AuthProviderWrapper>
    </BrowserRouter>
  </React.StrictMode>
);
