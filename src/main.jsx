// src/main.jsx
import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import AuthContext, { AuthProvider } from './context/AuthContext'; 
import { CartProvider } from '@/components/context/CartContext'; 
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
     <AuthProvider>
      <AuthProviderWrapper>
        <TradeCartProvider>
        <CartProvider>
            <App />
        </CartProvider>
        </TradeCartProvider>
        <Toaster position="top-right" reverseOrder={false} />
      </AuthProviderWrapper>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
